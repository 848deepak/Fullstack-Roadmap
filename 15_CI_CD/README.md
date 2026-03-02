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

<!-- DOCS_UPGRADE_V2026_START -->
## Documentation Upgrade Layer

### Breadcrumb Navigation
[Home](../README.md) > 15_CI_CD

### Internal Contents
- [Documentation Upgrade Layer](#documentation-upgrade-layer)
- [Conceptual Depth Model](#conceptual-depth-model)
- [Beginner Perspective](#beginner-perspective)
- [Intermediate Perspective](#intermediate-perspective)
- [Advanced Internal Working](#advanced-internal-working)
- [Under-the-Hood Architecture](#under-the-hood-architecture)
- [Real-World Use Cases](#real-world-use-cases)
- [Performance Considerations](#performance-considerations-upgrade)
- [Security Considerations](#security-considerations-upgrade)
- [Edge Cases and Limitations](#edge-cases-and-limitations)
- [Common Mistakes](#common-mistakes-upgrade)
- [Interview-Level Theory Questions](#interview-level-theory-questions-upgrade)
- [Production Best Practices](#production-best-practices-upgrade)
- [Folder Structure Diagram](#folder-structure-diagram-actual)
- [Examples Projects Advanced Production Map](#examples-projects-advanced-production-map)
- [Code References in Repository](#code-references-in-repository)
- [Cross-Module Links](#cross-module-links)
- [Navigation](#navigation)

### Conceptual Depth Model
This documentation extension preserves all existing module theory while adding architecture-level depth for `Module 15: CI/CD (Continuous Integration & Continuous Deployment)`. This README captures the module-level architecture narrative and practical learning progression. The dominant learning axis here is **pipeline design and deployment governance**, with internal behavior centered on **workflow orchestration, gates, and promotion strategies** and state/contracts centered on **build outputs, test signals, and release approvals**.

For every major concept in this module, analyze it through this lens:
- **Definition:** what the concept is and the precise technical boundary it defines.
- **Why it exists:** the failure mode or engineering bottleneck it solves.
- **How it works internally:** state changes, control flow, data flow, runtime behavior, and system boundaries.
- **When to use it:** the context where this concept provides leverage.
- **When not to use it:** cost, complexity, coupling, and maintainability trade-offs.
- **Performance implications:** latency, throughput, memory, I/O, network, CPU, and scalability behavior.
- **Security implications:** trust boundaries, attack surface, data exposure risks, and mitigation patterns.
- **Real-world scenario:** a production context where the concept appears in a full-stack system.
- **Code reference in repository:** practical anchor points inside this repository.

### Beginner Perspective
- Start with observable behavior for **pipeline design and deployment governance** before introducing abstractions.
- Track what inputs produce what outputs in **build outputs, test signals, and release approvals** workflows.
- Use one example at a time and explain expected behavior before extending it.

### Intermediate Perspective
- Connect module outputs to neighboring layers and contracts impacted by **pipeline design and deployment governance**.
- Analyze execution boundaries in **workflow orchestration, gates, and promotion strategies** to find bottlenecks and race conditions.
- Compare implementation options using maintainability, operability, and migration cost.

### Advanced Internal Working
- Model normal-path and failure-path control flow for **workflow orchestration, gates, and promotion strategies**.
- Specify invariants around **build outputs, test signals, and release approvals** that must hold under scale and partial failure.
- Document rollback and recovery behavior before introducing optimization layers.

### Under-the-Hood Architecture
- Core execution model in this module: **workflow orchestration, gates, and promotion strategies**.
- Primary state domain and contracts: **build outputs, test signals, and release approvals**.
- Dominant architectural risk to isolate: **unsafe automation and missing rollback controls**.

### Real-World Use Cases
- Build or migrate a system where **pipeline design and deployment governance** is a critical delivery concern.
- Operate high-change environments where **workflow orchestration, gates, and promotion strategies** behavior must stay predictable.
- Harden production paths where failures in **build outputs, test signals, and release approvals** handling have business impact.

### Performance Considerations Upgrade
- Benchmark latency and throughput at boundaries affected by **workflow orchestration, gates, and promotion strategies**.
- Reduce unnecessary work in **build outputs, test signals, and release approvals** processing paths before micro-optimizations.
- Track p95/p99 under burst traffic and verify graceful degradation behavior.

### Security Considerations Upgrade
- Protect trust boundaries around **build outputs, test signals, and release approvals** with strict validation and least privilege.
- Review abuse scenarios that exploit weak assumptions in **pipeline design and deployment governance** flows.
- Add auditability for privileged operations and incident reconstruction.

### Edge Cases and Limitations
- Invalid input types, partial payloads, and schema drift across versions.
- Concurrency conflicts, race conditions, and eventual consistency gaps in distributed flows.
- Environment-specific behavior differences (local, CI, staging, production).

### Common Mistakes Upgrade
- Treating **workflow orchestration, gates, and promotion strategies** behavior as deterministic without measuring it under load.
- Introducing abstractions before clarifying ownership of **build outputs, test signals, and release approvals** boundaries.
- Ignoring **unsafe automation and missing rollback controls** until late integration or production rollout.

### Interview-Level Theory Questions Upgrade
1. How do you design CI/CD pipelines that minimize lead time without reducing release confidence?
2. What criteria decide which checks must block merge, block deploy, or only warn?
3. How would you structure artifact promotion across dev/stage/prod to preserve provenance?
4. When should deployment approval be manual versus policy-driven and fully automated?
5. How do you prevent pipeline sprawl as team count and service count increase?

### Production Best Practices Upgrade
- Treat pipeline definitions as product code with ownership, SLAs, and change review standards.
- Use immutable, signed artifacts and enforce promotion-by-reference instead of rebuild-per-environment.
- Separate fast feedback checks from exhaustive checks to optimize developer flow.
- Automate rollback triggers using health and error-budget signals, not ad-hoc judgement.
- Continuously measure deployment frequency, change failure rate, and time-to-restore.

### Folder Structure Diagram (Actual)
```text
15_CI_CD/
├── 01_code_examples/
│   ├── github_actions_ci.yml
│   └── README.md
├── 02_practice_problems/
│   └── README.md
├── 03_interview_questions/
│   └── README.md
├── 04_mini_project/
│   └── README.md
├── 05_advanced_deep_dive/
│   └── README.md
├── advanced/
│   └── 01_matrix_build.yml
├── examples/
│   └── 01_basic_ci.yml
├── production/
│   └── 01_deploy_with_approval.yml
├── projects/
│   └── 01_multi_stage_pipeline.yml
├── README.md
```

### Examples Projects Advanced Production Map
- [Examples](01_code_examples/README.md): foundational patterns and minimal reproducible implementations.
- [Projects](04_mini_project/README.md): integrated workflows with realistic constraints and trade-offs.
- [Advanced](05_advanced_deep_dive/README.md): deeper internals, system boundaries, and scaling-oriented decisions.
- [Production Architecture](../20_Production_Architecture/README.md): reliability, observability, and long-term operability principles.

### Code References in Repository
- This section is concept-first. Reference neighboring examples and projects in this module.

### Cross-Module Links
- [Root Roadmap](../README.md)
- [15_CI_CD](README.md)
- [System Design](../11_System_Design/README.md)
- [Testing](../16_Testing/README.md)
- [Production Architecture](../20_Production_Architecture/README.md)

### Navigation
- **Previous Module:** [14_Containers_and_Orchestration](../14_Containers_and_Orchestration/README.md)
- **Next Module:** [16_Testing](../16_Testing/README.md)

<!-- DOCS_UPGRADE_V2026_END -->
