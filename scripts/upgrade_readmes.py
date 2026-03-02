from __future__ import annotations

import re
import os
from pathlib import Path


ROOT = Path("/Users/deepakpandey/Coding /fullstack")
ROOT_README = ROOT / "README.md"
MARKER_START = "<!-- DOCS_UPGRADE_V2026_START -->"
MARKER_END = "<!-- DOCS_UPGRADE_V2026_END -->"


MODULE_CONTEXT: dict[str, dict[str, str | list[str]]] = {
    "00_Fundamentals": {
        "focus": "web fundamentals and request lifecycle",
        "runtime": "browser networking stack and protocol negotiation",
        "data": "HTTP messages, headers, and rendering-critical assets",
        "risk": "misdiagnosing latency sources across DNS, TLS, network, and rendering",
    },
    "01_HTML": {
        "focus": "semantic document structure and accessibility",
        "runtime": "DOM parsing and accessibility tree construction",
        "data": "structured content and metadata",
        "risk": "poor semantics that degrade SEO, a11y, and maintainability",
    },
    "02_CSS": {
        "focus": "layout systems, visual hierarchy, and responsive rendering",
        "runtime": "style recalculation, layout, paint, and compositing",
        "data": "style rules, tokens, and breakpoints",
        "risk": "layout thrash, specificity conflicts, and inconsistent design behavior",
    },
    "03_JavaScript": {
        "focus": "language fundamentals and browser execution model",
        "runtime": "event loop, call stack, and task queues",
        "data": "objects, closures, arrays, and async payloads",
        "risk": "state bugs from mutation and async ordering mistakes",
    },
    "04_Advanced_JavaScript": {
        "focus": "advanced language mechanics and patterns",
        "runtime": "prototype chain resolution and memory/GC behavior",
        "data": "higher-order abstractions and composable modules",
        "risk": "clever abstractions that reduce clarity and debuggability",
    },
    "05_React": {
        "focus": "component architecture and state management",
        "runtime": "React render/commit lifecycle and reconciliation",
        "data": "component props, local/global state, and UI derivations",
        "risk": "uncontrolled re-renders, stale closures, and brittle state boundaries",
    },
    "06_NextJS": {
        "focus": "server/client rendering strategies and routing",
        "runtime": "hybrid SSR/SSG/ISR execution pipeline",
        "data": "route-level data fetching and cache revalidation",
        "risk": "cache invalidation and boundary confusion between server and client",
    },
    "07_Java_Backend": {
        "focus": "backend service architecture in Java",
        "runtime": "JVM execution, thread pools, and request handling",
        "data": "domain models, DTOs, and persistence mappings",
        "risk": "thread safety issues and over-coupled service layers",
    },
    "08_APIs_and_HTTP": {
        "focus": "API contract design and HTTP correctness",
        "runtime": "request validation, routing, serialization, and error translation",
        "data": "versioned payload contracts and status semantics",
        "risk": "breaking API contracts and inconsistent error semantics",
    },
    "09_Databases": {
        "focus": "data modeling, query strategy, and consistency",
        "runtime": "query planning, indexing, locking, and transactions",
        "data": "normalized relational entities and access patterns",
        "risk": "unbounded query cost, contention, and data inconsistency",
    },
    "10_Authentication_and_Security": {
        "focus": "identity, authorization, and security controls",
        "runtime": "token issuance/validation and policy enforcement",
        "data": "credentials, claims, sessions, and permission scopes",
        "risk": "broken access control and unsafe secret handling",
    },
    "11_System_Design": {
        "focus": "scalable distributed architecture",
        "runtime": "inter-service communication and failure coordination",
        "data": "event streams, aggregates, and replicated state",
        "risk": "architectural bottlenecks and weak failure isolation",
    },
    "12_DevOps": {
        "focus": "delivery automation and environment reliability",
        "runtime": "build pipelines, deployment steps, and operational scripts",
        "data": "artifacts, env configs, and release metadata",
        "risk": "fragile release flows and non-reproducible environments",
    },
    "13_Cloud_Infrastructure": {
        "focus": "cloud resource architecture and IaC",
        "runtime": "provisioning plans, state reconciliation, and resource drift control",
        "data": "infrastructure state and environment topology",
        "risk": "misconfigured networking/permissions and uncontrolled cloud cost",
    },
    "14_Containers_and_Orchestration": {
        "focus": "container packaging and orchestration behavior",
        "runtime": "image build/runtime and scheduler placement decisions",
        "data": "container images, manifests, and service policies",
        "risk": "runtime instability from bad probes, resources, or rollout settings",
    },
    "15_CI_CD": {
        "focus": "pipeline design and deployment governance",
        "runtime": "workflow orchestration, gates, and promotion strategies",
        "data": "build outputs, test signals, and release approvals",
        "risk": "unsafe automation and missing rollback controls",
    },
    "16_Testing": {
        "focus": "test strategy and quality confidence",
        "runtime": "unit/integration/system test execution lifecycle",
        "data": "fixtures, mocks, and contract expectations",
        "risk": "false confidence due to flaky or shallow test coverage",
    },
    "17_Monitoring_and_Logging": {
        "focus": "observability and incident diagnostics",
        "runtime": "metrics/log collection, aggregation, and alert evaluation",
        "data": "telemetry signals, traces, and structured logs",
        "risk": "blind spots in alerts and poor incident triage data",
    },
    "18_Backup_and_Recovery": {
        "focus": "data durability and disaster recovery",
        "runtime": "backup scheduling, retention, and restore workflows",
        "data": "snapshots, WAL/archive logs, and recovery checkpoints",
        "risk": "backup without restore validation and unmet RTO/RPO",
    },
    "19_Networking": {
        "focus": "service networking and traffic management",
        "runtime": "DNS resolution, L4/L7 routing, and connection management",
        "data": "packets, headers, and load-balancer metadata",
        "risk": "latency spikes and outage propagation from network misconfiguration",
    },
    "20_Production_Architecture": {
        "focus": "production reliability architecture",
        "runtime": "health checks, failover, capacity controls, and degradation paths",
        "data": "SLO signals, dependency health, and capacity metrics",
        "risk": "cascading failures from weak resilience boundaries",
    },
    "21_Real_World_Projects": {
        "focus": "full-stack project integration and delivery",
        "runtime": "end-to-end workflow across frontend, backend, data, and infra",
        "data": "cross-service contracts and project-level operational metadata",
        "risk": "integration drift between modules and missing production readiness checks",
    },
}


SECTION_CONTEXT: dict[str, str] = {
    "01_code_examples": "code-examples",
    "02_practice_problems": "practice",
    "03_interview_questions": "interview",
    "04_mini_project": "project",
    "05_advanced_deep_dive": "advanced",
}


def context_for(module_name: str | None) -> dict[str, str | list[str]]:
    if module_name and module_name in MODULE_CONTEXT:
        return MODULE_CONTEXT[module_name]
    return {
        "focus": "full-stack engineering concepts",
        "runtime": "runtime control flow and architecture boundaries",
        "data": "application and infrastructure state",
        "risk": "coupling, performance regressions, and security gaps",
    }


def slug(text: str) -> str:
    value = re.sub(r"[^a-zA-Z0-9\s\-]", "", text).strip().lower()
    return re.sub(r"\s+", "-", value)


def first_heading(content: str) -> str:
    for line in content.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return "Module Documentation"


def strip_previous_upgrade(content: str) -> str:
    if MARKER_START in content and MARKER_END in content:
        pattern = re.compile(
            rf"\n?{re.escape(MARKER_START)}[\s\S]*?{re.escape(MARKER_END)}\n?",
            re.MULTILINE,
        )
        return re.sub(pattern, "\n", content).rstrip() + "\n"
    return content


def list_top_modules() -> list[Path]:
    modules: list[Path] = []
    for entry in ROOT.iterdir():
        if entry.is_dir() and re.match(r"^\d{2}_", entry.name):
            modules.append(entry)
    modules.sort(key=lambda p: int(p.name.split("_", 1)[0]))
    return modules


def breadcrumb_for(path: Path) -> str:
    rel = path.relative_to(ROOT)
    parts = list(rel.parts[:-1])
    links = [f"[Home]({rel_link(path, ROOT / 'README.md')})"]
    running = Path()
    for part in parts:
        running /= part
        readme_target = running / "README.md"
        if readme_target.exists():
            links.append(f"[{part}]({rel_link(path, ROOT / readme_target)})")
        else:
            links.append(part)
    return " > ".join(links)


def parent_module(rel_parts: tuple[str, ...]) -> str | None:
    if not rel_parts:
        return None
    if re.match(r"^\d{2}_", rel_parts[0]):
        return rel_parts[0]
    return None


def rel_link(from_readme: Path, target: Path) -> str:
    return Path(os.path.relpath(target, start=from_readme.parent)).as_posix()


def module_nav(module_name: str, modules: list[Path]) -> tuple[str | None, str | None]:
    names = [m.name for m in modules]
    if module_name not in names:
        return None, None
    idx = names.index(module_name)
    prev_mod = names[idx - 1] if idx > 0 else None
    next_mod = names[idx + 1] if idx < len(names) - 1 else None
    return prev_mod, next_mod


def dir_tree(readme_path: Path) -> str:
    base = readme_path.parent
    children = sorted(base.iterdir(), key=lambda p: (p.is_file(), p.name.lower()))
    lines = [f"{base.name}/"]
    for child in children:
        prefix = "├── "
        name = child.name + ("/" if child.is_dir() else "")
        lines.append(prefix + name)
        if child.is_dir():
            nested = sorted(child.iterdir(), key=lambda p: (p.is_file(), p.name.lower()))[:6]
            for idx, item in enumerate(nested):
                branch = "│   ├── " if idx < len(nested) - 1 else "│   └── "
                lines.append(branch + item.name + ("/" if item.is_dir() else ""))
    return "\n".join(lines)


def code_refs(readme_path: Path) -> list[str]:
    files = [
        p
        for p in sorted(readme_path.parent.iterdir(), key=lambda p: p.name.lower())
        if p.is_file() and p.name != "README.md"
    ]
    refs = [p.relative_to(ROOT).as_posix() for p in files[:8]]
    return refs


def section_links(readme_path: Path, module_name: str | None) -> tuple[str, str, str, str]:
    base = readme_path.parent
    examples = base / "01_code_examples" / "README.md"
    projects = base / "04_mini_project" / "README.md"
    advanced = base / "05_advanced_deep_dive" / "README.md"
    production = ROOT / "20_Production_Architecture" / "README.md"

    ex = f"[Examples]({rel_link(readme_path, examples)})" if examples.exists() else "Examples (not present in this folder)"
    pr = f"[Projects]({rel_link(readme_path, projects)})" if projects.exists() else "Projects (not present in this folder)"
    ad = f"[Advanced]({rel_link(readme_path, advanced)})" if advanced.exists() else "Advanced (not present in this folder)"
    pd = f"[Production Architecture]({rel_link(readme_path, production)})" if production.exists() else "Production (not present)"
    if module_name == "20_Production_Architecture":
        pd = "Production Architecture (current module)"
    return ex, pr, ad, pd


def build_module_upgrade(readme_path: Path, modules: list[Path], content: str) -> str:
    rel = readme_path.relative_to(ROOT)
    title = first_heading(content)
    crumb = breadcrumb_for(readme_path)
    parts = rel.parts
    module_name = parent_module(parts)
    context = context_for(module_name)
    focus = str(context["focus"])
    runtime = str(context["runtime"])
    data = str(context["data"])
    risk = str(context["risk"])
    section_kind = SECTION_CONTEXT.get(parts[1], "module") if len(parts) > 1 else "module"

    section_explanation = {
        "code-examples": "This folder emphasizes executable reference implementations that show baseline and production-oriented patterns side by side.",
        "practice": "This folder emphasizes skill reinforcement through progressive exercises and scenario-driven problem solving.",
        "interview": "This folder emphasizes conceptual articulation, trade-off reasoning, and architecture communication under interview constraints.",
        "project": "This folder emphasizes integration depth: system boundaries, delivery workflows, and production readiness.",
        "advanced": "This folder emphasizes internals, failure modes, scaling constraints, and architecture evolution strategies.",
        "module": "This README captures the module-level architecture narrative and practical learning progression.",
    }[section_kind]

    prev_label = "None"
    next_label = "None"
    if module_name:
        prev_mod, next_mod = module_nav(module_name, modules)
        if prev_mod:
            prev_label = f"[{prev_mod}]({rel_link(readme_path, ROOT / prev_mod / 'README.md')})"
        if next_mod:
            next_label = f"[{next_mod}]({rel_link(readme_path, ROOT / next_mod / 'README.md')})"

    refs = code_refs(readme_path)
    if refs:
        refs_block = "\n".join(f"- `{ref}`" for ref in refs)
    else:
        refs_block = "- This section is concept-first. Reference neighboring examples and projects in this module."

    examples_link, projects_link, advanced_link, production_link = section_links(readme_path, module_name)

    related = [
        f"[Root Roadmap]({rel_link(readme_path, ROOT / 'README.md')})",
        f"[System Design]({rel_link(readme_path, ROOT / '11_System_Design' / 'README.md')})",
        f"[Testing]({rel_link(readme_path, ROOT / '16_Testing' / 'README.md')})",
        f"[Production Architecture]({rel_link(readme_path, ROOT / '20_Production_Architecture' / 'README.md')})",
    ]
    if module_name and module_name != "11_System_Design":
        related.insert(1, f"[{module_name}]({rel_link(readme_path, ROOT / module_name / 'README.md')})")

    toc = [
        "- [Documentation Upgrade Layer](#documentation-upgrade-layer)",
        "- [Conceptual Depth Model](#conceptual-depth-model)",
        "- [Beginner Perspective](#beginner-perspective)",
        "- [Intermediate Perspective](#intermediate-perspective)",
        "- [Advanced Internal Working](#advanced-internal-working)",
        "- [Under-the-Hood Architecture](#under-the-hood-architecture)",
        "- [Real-World Use Cases](#real-world-use-cases)",
        "- [Performance Considerations](#performance-considerations-upgrade)",
        "- [Security Considerations](#security-considerations-upgrade)",
        "- [Edge Cases and Limitations](#edge-cases-and-limitations)",
        "- [Common Mistakes](#common-mistakes-upgrade)",
        "- [Interview-Level Theory Questions](#interview-level-theory-questions-upgrade)",
        "- [Production Best Practices](#production-best-practices-upgrade)",
        "- [Folder Structure Diagram](#folder-structure-diagram-actual)",
        "- [Examples Projects Advanced Production Map](#examples-projects-advanced-production-map)",
        "- [Code References in Repository](#code-references-in-repository)",
        "- [Cross-Module Links](#cross-module-links)",
        "- [Navigation](#navigation)",
    ]

    tree = dir_tree(readme_path)
    related_block = "\n".join(f"- {item}" for item in related)
    toc_block = "\n".join(toc)

    beginner_block = "\n".join(
        [
            f"- Start with observable behavior for **{focus}** before introducing abstractions.",
            f"- Track what inputs produce what outputs in **{data}** workflows.",
            "- Use one example at a time and explain expected behavior before extending it.",
        ]
    )
    intermediate_block = "\n".join(
        [
            f"- Connect module outputs to neighboring layers and contracts impacted by **{focus}**.",
            f"- Analyze execution boundaries in **{runtime}** to find bottlenecks and race conditions.",
            "- Compare implementation options using maintainability, operability, and migration cost.",
        ]
    )
    advanced_block = "\n".join(
        [
            f"- Model normal-path and failure-path control flow for **{runtime}**.",
            f"- Specify invariants around **{data}** that must hold under scale and partial failure.",
            "- Document rollback and recovery behavior before introducing optimization layers.",
        ]
    )
    architecture_block = "\n".join(
        [
            f"- Core execution model in this module: **{runtime}**.",
            f"- Primary state domain and contracts: **{data}**.",
            f"- Dominant architectural risk to isolate: **{risk}**.",
        ]
    )
    use_cases_block = "\n".join(
        [
            f"- Build or migrate a system where **{focus}** is a critical delivery concern.",
            f"- Operate high-change environments where **{runtime}** behavior must stay predictable.",
            f"- Harden production paths where failures in **{data}** handling have business impact.",
        ]
    )
    performance_block = "\n".join(
        [
            f"- Benchmark latency and throughput at boundaries affected by **{runtime}**.",
            f"- Reduce unnecessary work in **{data}** processing paths before micro-optimizations.",
            "- Track p95/p99 under burst traffic and verify graceful degradation behavior.",
        ]
    )
    security_block = "\n".join(
        [
            f"- Protect trust boundaries around **{data}** with strict validation and least privilege.",
            f"- Review abuse scenarios that exploit weak assumptions in **{focus}** flows.",
            "- Add auditability for privileged operations and incident reconstruction.",
        ]
    )
    mistakes_block = "\n".join(
        [
            f"- Treating **{runtime}** behavior as deterministic without measuring it under load.",
            f"- Introducing abstractions before clarifying ownership of **{data}** boundaries.",
            f"- Ignoring **{risk}** until late integration or production rollout.",
        ]
    )
    interview_block = "\n".join(
        [
            f"1. Which invariants in **{focus}** must hold for correctness, and how would you enforce them?",
            f"2. What trade-offs emerge when optimizing **{runtime}** for latency vs reliability?",
            f"3. How would you detect and mitigate failures related to **{risk}**?",
            f"4. How would you scale **{data}** boundaries without rewriting the full module?",
            "5. Which telemetry would you add first to debug this module during incidents?",
        ]
    )
    best_practices_block = "\n".join(
        [
            f"- Keep contracts explicit around **{data}** and version them intentionally.",
            f"- Write ADR-style decisions for major design choices in **{focus}**.",
            "- Validate failure paths and rollback plans with runnable drills, not assumptions.",
            "- Keep docs synchronized with executable examples, projects, and deployment realities.",
        ]
    )

    return f"""
{MARKER_START}
## Documentation Upgrade Layer

### Breadcrumb Navigation
{crumb}

### Internal Contents
{toc_block}

### Conceptual Depth Model
This documentation extension preserves all existing module theory while adding architecture-level depth for `{title}`. {section_explanation} The dominant learning axis here is **{focus}**, with internal behavior centered on **{runtime}** and state/contracts centered on **{data}**.

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
{beginner_block}

### Intermediate Perspective
{intermediate_block}

### Advanced Internal Working
{advanced_block}

### Under-the-Hood Architecture
{architecture_block}

### Real-World Use Cases
{use_cases_block}

### Performance Considerations Upgrade
{performance_block}

### Security Considerations Upgrade
{security_block}

### Edge Cases and Limitations
- Invalid input types, partial payloads, and schema drift across versions.
- Concurrency conflicts, race conditions, and eventual consistency gaps in distributed flows.
- Environment-specific behavior differences (local, CI, staging, production).

### Common Mistakes Upgrade
{mistakes_block}

### Interview-Level Theory Questions Upgrade
{interview_block}

### Production Best Practices Upgrade
{best_practices_block}

### Folder Structure Diagram (Actual)
```text
{tree}
```

### Examples Projects Advanced Production Map
- {examples_link}: foundational patterns and minimal reproducible implementations.
- {projects_link}: integrated workflows with realistic constraints and trade-offs.
- {advanced_link}: deeper internals, system boundaries, and scaling-oriented decisions.
- {production_link}: reliability, observability, and long-term operability principles.

### Code References in Repository
{refs_block}

### Cross-Module Links
{related_block}

### Navigation
- **Previous Module:** {prev_label}
- **Next Module:** {next_label}

{MARKER_END}
"""


def build_root_upgrade(modules: list[Path]) -> str:
    module_links = "\n".join(f"- [{m.name}]({m.name}/README.md)" for m in modules)
    roadmap_rows = []
    for m in modules:
        n = int(m.name.split("_", 1)[0])
        if n <= 3:
            stage = "Foundations"
        elif n <= 10:
            stage = "Core Full-Stack"
        elif n <= 16:
            stage = "Advanced Engineering"
        else:
            stage = "Production Architecture"
        roadmap_rows.append(f"| {m.name} | {stage} | [{m.name}/README.md]({m.name}/README.md) |")
    roadmap_table = "\n".join(roadmap_rows)

    return f"""
{MARKER_START}
## Full-Stack Engineering Knowledge Base Upgrade (2026)

### Breadcrumb Navigation
[Home](README.md)

### Indexed Table of Contents
- [Vision and Professional Introduction](#vision-and-professional-introduction)
- [Audience Profile](#audience-profile)
- [Repository Information Architecture](#repository-information-architecture)
- [Structured Learning Roadmap](#structured-learning-roadmap)
- [Complete Module Index](#complete-module-index)
- [Technology Stack Breakdown](#technology-stack-breakdown)
- [Architecture Philosophy](#architecture-philosophy)
- [How to Use This Repository](#how-to-use-this-repository-production-study-path)
- [Contribution Workflow](#contribution-workflow)
- [License](#license)
- [Cross-Module Navigation](#cross-module-navigation)

### Vision and Professional Introduction
This repository is structured as a production-grade full-stack engineering knowledge base, not only as a tutorial collection. The objective is to connect deep theory, executable examples, architecture trade-offs, and production-oriented constraints across the full delivery lifecycle: browser runtime, backend services, data systems, infrastructure, CI/CD, reliability, and operations.

### Audience Profile
- **Beginner engineers:** build a first-principles mental model with hands-on examples and progressive mini-projects.
- **Intermediate developers:** strengthen implementation decisions, debugging strategy, and system-level reasoning.
- **Advanced engineers:** study internal working mechanisms, scaling constraints, reliability patterns, and architecture evolution.

### Repository Information Architecture
- Primary path: `00` through `21` modules with standardized subfolders (`01_code_examples`, `02_practice_problems`, `03_interview_questions`, `04_mini_project`, `05_advanced_deep_dive`).
- Supporting references: `LEARNING_PATH.md`, `TOPIC_COVERAGE_MATRIX.md`, `00-reference-index.md`, and `00-start-here-glossary.md`.
- Legacy tracks remain preserved (`01-javascript`, `02-react`, `03-bonus-industry-skills`) for compatibility and parallel study.

### Structured Learning Roadmap
| Module | Stage | Entry |
|---|---|---|
{roadmap_table}

### Complete Module Index
{module_links}

### Technology Stack Breakdown
- **Frontend foundations:** HTML, CSS, modern JavaScript, browser APIs, performance, accessibility, and SEO.
- **Frontend architecture:** React, Next.js, routing strategies, state management, API integration, and testing.
- **Backend and APIs:** Java backend patterns, service design, protocol correctness, and API evolution strategies.
- **Data systems:** relational and non-relational modeling, query optimization, transactions, indexing, and data consistency.
- **Platform and operations:** DevOps, cloud infrastructure, containers, CI/CD, observability, backup/recovery, and networking.
- **System-level engineering:** system design and production architecture with scalability, reliability, and cost-awareness.

### Architecture Philosophy
- Build from fundamentals toward production through explicit abstraction layers.
- Prefer clear contracts and deterministic behavior over hidden coupling.
- Treat non-functional requirements (security, performance, reliability, operability) as first-class design inputs.
- Evolve systems incrementally through measurable feedback loops and documented trade-offs.

### How to Use This Repository (Production Study Path)
1. Traverse modules in numeric order for progressive depth.
2. In each module, complete examples first, then practice, interview, mini-project, and advanced deep dive.
3. Add architecture notes per project: assumptions, constraints, trade-offs, and failure handling.
4. Validate with tests and instrumentation before optimization.
5. Revisit related modules via cross-links to connect theory across frontend, backend, data, and operations.

### Contribution Workflow
- Follow [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
- Keep documentation synchronized with real folder structure and runnable examples.
- For each new concept, include definition, internal mechanics, usage boundaries, performance/security implications, and repository code references.
- Preserve existing depth; expand clarity without removing theoretical context.

### License
This repository is distributed under the terms defined in [LICENSE](LICENSE).

### Cross-Module Navigation
- **First Learning Module:** [00_Fundamentals](00_Fundamentals/README.md)
- **Core Frontend Progression:** [01_HTML](01_HTML/README.md) → [02_CSS](02_CSS/README.md) → [03_JavaScript](03_JavaScript/README.md) → [05_React](05_React/README.md) → [06_NextJS](06_NextJS/README.md)
- **Core Backend/Data Progression:** [07_Java_Backend](07_Java_Backend/README.md) → [08_APIs_and_HTTP](08_APIs_and_HTTP/README.md) → [09_Databases](09_Databases/README.md) → [10_Authentication_and_Security](10_Authentication_and_Security/README.md)
- **Production Progression:** [11_System_Design](11_System_Design/README.md) → [12_DevOps](12_DevOps/README.md) → [13_Cloud_Infrastructure](13_Cloud_Infrastructure/README.md) → [14_Containers_and_Orchestration](14_Containers_and_Orchestration/README.md) → [15_CI_CD](15_CI_CD/README.md) → [16_Testing](16_Testing/README.md) → [17_Monitoring_and_Logging](17_Monitoring_and_Logging/README.md) → [18_Backup_and_Recovery](18_Backup_and_Recovery/README.md) → [19_Networking](19_Networking/README.md) → [20_Production_Architecture](20_Production_Architecture/README.md) → [21_Real_World_Projects](21_Real_World_Projects/README.md)

{MARKER_END}
"""


def main() -> None:
    modules = list_top_modules()
    readmes = sorted(ROOT.rglob("README.md"))

    for readme in readmes:
        content = readme.read_text(encoding="utf-8")
        content = strip_previous_upgrade(content)

        if readme == ROOT_README:
            upgrade = build_root_upgrade(modules)
            updated = content.rstrip() + "\n\n" + upgrade.strip() + "\n"
        else:
            upgrade = build_module_upgrade(readme, modules, content)
            updated = content.rstrip() + "\n\n" + upgrade.strip() + "\n"

        readme.write_text(updated, encoding="utf-8")

    print(f"Updated {len(readmes)} README files.")


if __name__ == "__main__":
    main()
