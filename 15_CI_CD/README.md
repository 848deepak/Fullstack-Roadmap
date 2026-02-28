# Module 15: CI/CD (Continuous Integration & Continuous Deployment)

## 1. Concept Overview
CI/CD represents the automation of the entire software release process. It ensures that from the moment a developer types `git push`, the code is automatically tested, built, versioned, and deployed to production servers without any human intervention.

## 2. Theory from Scratch
- **Continuous Integration (CI):** The practice of frequently merging code changes into a central repository. Every merge triggers an automated pipeline that builds the app and runs unit/integration tests to ensure the new code didn't break existing features.
- **Continuous Delivery (CD):** The automated process of packaging the tested code (producing an artifact or Docker image) and preparing it for release to an environment (Staging/Prod). It still requires a human to click a "Deploy" button.
- **Continuous Deployment (CD):** Taking Delivery one step further: if the tests pass, the artifact is deployed instantly to the live production servers automatically.

## 3. Internal Working (Under the Hood)
### GitHub Actions / Jenkins Pipelines
A pipeline is generally defined in a YAML file living alongside the source code (`.github/workflows/main.yml`). 
When an event (like a `push` to the `main` branch) occurs, GitHub spins up a fresh, isolated Virtual Machine (a "Runner"). The Runner clones the repo, installs dependencies (`npm ci`), runs the test suite (`npm test`), builds the Docker image (`docker build`), and pushes it to a registry. If any step returns a non-zero exit code (failure), the pipeline halts immediately, preventing broken code from reaching production.

## 4. Why it is used in Production
Manual deployments are error-prone. A developer might forget to run database migrations or accidentally deploy branching code instead of `main`. CI/CD removes human error, vastly accelerates the release cycle (from deploying once a month to deploying 50 times a day), and provides immediate feedback if a commit breaks the build.

## 5. Architecture Diagrams

**Standard CI/CD Production Pipeline:**
```text
[ Developer ]
      | (git push)
      v
[ GitHub Repository ] ---triggers---> [ CI/CD Platform (GitHub Actions) ]
                                                |
                                    +-----------v-----------+
                                    | 1. Code Linting       | (Fails if messy)
                                    | 2. Unit Tests         | (Fails if broken)
                                    | 3. Integration Tests  |
                                    | 4. Security Scan      | (Fails if vulnerable)
                                    +-----------+-----------+
                                                | (If all pass)
                                                v
                                    +-----------------------+
                                    | 5. Build Docker Image |
                                    | 6. Push to AWS ECR    |
                                    +-----------+-----------+
                                                |
                                                v
                                    +-----------------------+
                             <------+ 7. SSH into Prod EC2  |
 [ Live Server ] <------------------+ 8. Pull new Docker img|
     Upgraded!                      | 9. Restart Container  |
                                    +-----------------------+
```

## 6. Performance Considerations
- **Caching Dependencies:** Running `npm install` or `mvn clean install` on every single commit wastes massive compute time and money. CI/CD pipelines MUST cache `.npm` or `.m2` directories so subsequent builds download only changed packages.
- **Parallel Jobs:** Running 5,000 unit tests sequentially might take an hour. Split them into 5 parallel runner jobs to finish in 12 minutes.

## 7. Security Considerations
- **Secret Leaks:** Never hardcode AWS keys in pipeline scripts or `echo` them into logs. Use native Vaults (like GitHub Secrets).
- **Supply Chain Attacks:** If you use a malicious `npm` package, it can execute code *during* the CI build step to steal your deployment secrets. Always use strict lockfiles (`package-lock.json`) and run `npm audit` inside the pipeline.

## 8. Common Mistakes
- **Flaky Tests:** Tests that pass 90% of the time but fail 10% randomly (usually due to network timeouts or race conditions). Flaky tests condition developers to ignore the red "Pipeline Failed" alerts, defeating the entire purpose of CI.
- **Testing against Prod:** CI integration tests should run against an ephemeral sandbox database (like a temporary Docker MySQL container), never the live production database.

## 9. Interview Questions
1. **Q:** What is the difference between `npm install` and `npm ci`?
   **A:** `npm install` can update package versions and overwrite the lockfile. `npm ci` strictly reads from `package-lock.json`, ensuring the exact same dependency versions are installed on the CI server as on the developer's laptop.
2. **Q:** What is a "Rollback" strategy?
   **A:** If continuous deployment pushes a severe bug, the system must be able to instantly revert to the previous stable Docker image / Git commit to restore service while developers debug the issue offline.
3. **Q:** How do you handle database migrations in a CI/CD pipeline?
   **A:** Migrations (tools like Flyway/Liquibase) are run strictly as a pipeline step *before* substituting the new application containers.

## 10. Production-Level Best Practices
- **Infrastructure as Code in CI/CD (GitOps):** Don't just deploy the app code via CI/CD. Use tools like Terraform or ArgoCD so that changing a server's RAM in a configuration file and merging the PR automatically provisions the larger server.
- **Environment Isolation:** Maintain strictly separate `.env` configurations and databases for `test`, `staging` (a clone of prod), and `production`.
