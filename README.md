<div align="center">

<img src="https://raw.githubusercontent.com/Devopstrio/.github/main/assets/Browser_logo.png" height="150" alt="Chatbot Accelerator Logo" />

<h1>Chatbot Accelerator</h1>

<p><strong>The Enterprise Flagship Platform for Secure, Governed, and Scalable GenAI Assistants</strong></p>

[![Standard: ALZ--Aligned](https://img.shields.io/badge/Standard-ALZ--Aligned-blue.svg?style=for-the-badge&labelColor=000000)]()
[![Status: Production--Ready](https://img.shields.io/badge/Status-Production--Ready-indigo.svg?style=for-the-badge&labelColor=000000)]()
[![Security: Zero--Trust](https://img.shields.io/badge/Security-Zero--Trust-green.svg?style=for-the-badge&labelColor=000000)]()
[![Platform: Azure--OpenAI](https://img.shields.io/badge/Platform-Azure--OpenAI-0078d4?style=for-the-badge&logo=microsoftazure&labelColor=000000)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&labelColor=000000)]()

<br/>

> **"Unlocking Enterprise Intelligence at Scale."** 
> Chatbot Accelerator is an industrial-grade foundation for deploying private, RAG-powered AI assistants that adhere to the strictest enterprise governance, security, and operational standards.

</div>

---

## 🏛️ Executive Summary

In the rapidly evolving landscape of Generative AI, enterprise organizations face a critical challenge: how to move beyond experimental "playground" bots to production-grade assistants that are secure, governed, and integrated with institutional knowledge. 

**Chatbot Accelerator** is a comprehensive, production-ready platform engineered to solve this challenge. It provides a modular architecture for building, deploying, and managing multi-channel AI assistants—from ITSM support bots to sophisticated HR assistants—utilizing **Azure OpenAI**, **pgvector**, and a high-performance **FastAPI** backend.

---

## 🚀 Business Outcomes & Use Cases

### 🎯 Key Business Outcomes
- **Reduced Time-to-Market**: Deploy production-ready AI assistants in days instead of months.
- **Operational Efficiency**: Automate up to 60% of common internal support queries.
- **Cost Optimization**: Standardized token management and model routing to minimize GenAI spend.
- **Enhanced Security**: Zero-trust networking and PII redaction ensure data privacy and compliance.

### 💼 High-Impact Use Cases
| Use Case | Description | Target Audience |
|---|---|---|
| **ITSM Support Bot** | Instant resolution for password resets, VPN access, and ticket status. | Internal Employees |
| **HR Assistant** | Automated guidance on policy, benefits, and payroll. | Human Resources |
| **Enterprise Search** | RAG-powered search across internal wikis, SharePoint, and PDFs. | All Departments |
| **Developer Copilot** | Internal documentation and coding standard assistant. | Engineering |

---

## 🛠️ Technical Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Cloud** | Azure | Enterprise-grade reliability and native OpenAI integration. |
| **AI Engine** | Azure OpenAI (GPT-4o/GPT-3.5) | Sovereign model hosting with data privacy guarantees. |
| **Frontend** | React 18, Vite, Tailwind CSS | High-performance, responsive UI with modern DX. |
| **Backend** | FastAPI (Python) | High-concurrency, asynchronous API gateway. |
| **Vector DB** | PostgreSQL + pgvector | Unified relational and semantic search storage. |
| **Orchestration** | Redis + Celery/Worker | Scalable async ingestion and document processing. |
| **Infra (IaC)** | Terraform | Declarative, version-controlled infrastructure. |
| **Deployment** | AKS (Kubernetes) | Scalable, resilient container orchestration. |

---

## 📐 Architecture Storytelling: 50+ Diagrams

### 1. High-Level Platform Architecture
```mermaid
graph TD
    User((Enterprise User)) --> Web[React Chat UI]
    Web --> API[FastAPI Gateway]
    API --> Auth[Entra ID / OIDC]
    API --> Orchestrator[Chat Orchestrator]
    Orchestrator --> RAG[RAG Engine]
    Orchestrator --> LLM[Azure OpenAI]
    RAG --> Vector[(pgvector)]
    RAG --> Search[AI Search]
    Orchestrator --> Telemetry[OpenTelemetry]
```

### 2. Detailed Component Topology
```mermaid
graph LR
    subgraph "Public Internet"
        UI[Static Web App]
    end
    subgraph "Azure Virtual Network"
        subgraph "AKS Cluster"
            API_Pod[API Pods]
            Worker_Pod[Worker Pods]
        end
        subgraph "Data Tier"
            DB[(PostgreSQL)]
            Cache[(Redis)]
        end
        subgraph "AI Services"
            AOI[Azure OpenAI]
        end
    end
    UI -->|HTTPS| API_Pod
    API_Pod --> DB
    API_Pod --> Cache
    API_Pod --> AOI
    Worker_Pod --> DB
    Worker_Pod --> AOI
```

### 3. Frontend to Backend Request Path
```mermaid
sequenceDiagram
    participant U as User
    participant W as Web App
    participant L as Load Balancer
    participant A as FastAPI
    participant Auth as Auth Provider
    
    U->>W: Type message
    W->>Auth: Validate Session
    Auth-->>W: Valid Token
    W->>L: POST /api/v1/chat
    L->>A: Route Request
    A-->>W: 202 Accepted (Streaming)
    A->>W: Chunk 1...n
```

### 4. Backend Service Mesh View
```mermaid
graph TD
    Ingress[Nginx Ingress] --> API[API Service]
    API --> Redis[Redis Service]
    API --> Postgres[Postgres Service]
    Worker[Worker Service] --> Redis
    Worker --> Postgres
    API -.-> Tracing[Jaeger/OTEL]
```

### 5. AI Gateway Architecture
```mermaid
graph TD
    Req[Incoming Request] --> Policy[Policy Check]
    Policy --> Router[Model Router]
    Router --> GPT4[GPT-4o]
    Router --> GPT3[GPT-3.5-Turbo]
    Router --> Custom[OpenSource Model]
    GPT4 --> Token[Token Counter]
    GPT3 --> Token
    Token --> Audit[Audit Log]
```

### 6. Multi-Model Routing Architecture
```mermaid
stateDiagram-v2
    [*] --> Classification
    Classification --> Complex: Logic/Math
    Classification --> Simple: Greeting/Small Talk
    Complex --> GPT4_Deploy: High Performance
    Simple --> GPT3_Deploy: High Speed
    GPT4_Deploy --> [*]
    GPT3_Deploy --> [*]
```

### 7. Multi-Tenant Architecture
```mermaid
graph LR
    TenantA[Tenant A] -->|Namespace A| PodA[API Pod A]
    TenantB[Tenant B] -->|Namespace B| PodB[API Pod B]
    PodA --> SchemaA[(DB Schema A)]
    PodB --> SchemaB[(DB Schema B)]
    PodA --> KeyA[KeyVault A]
    PodB --> KeyB[KeyVault B]
```

### 8. Regional Deployment Architecture
```mermaid
graph TD
    Traffic[Global Traffic] --> TM[Traffic Manager]
    TM --> WestUS[West US 2]
    TM --> EastUS[East US]
    TM --> NorthEU[North Europe]
    subgraph "West US"
        AKS1[AKS]
        DB1[Geo-Sync DB]
    end
```

### 9. DR Failover Architecture
```mermaid
graph TD
    Primary[Primary Region: East US] -->|Failover| Secondary[Secondary Region: West US]
    Primary_RDS[(RDS Master)] -->|Sync| Secondary_RDS[(RDS Standby)]
    R53[Route 53 / Traffic Manager] -->|Healthy| Primary
    R53 -.->|Failure Detected| Secondary
```

### 10. Blue/Green Deployment Architecture
```mermaid
graph LR
    User --> LB[Load Balancer]
    subgraph "Production"
        Blue[Blue: v1.0.0 (Active)]
    end
    subgraph "Staging"
        Green[Green: v1.1.0 (Testing)]
    end
    LB --> Blue
    LB -.->|Switch| Green
```

### 11. Document Upload Workflow
```mermaid
graph TD
    User[Admin User] -->|Upload| UI[Portal]
    UI -->|Presigned URL| S3[Azure Storage]
    S3 -->|Trigger| Worker[Ingestion Worker]
    Worker -->|Read| OCR[Document Intelligence]
    OCR -->|Metadata| DB[Postgres]
```

### 12. OCR Ingestion Pipeline
```mermaid
flowchart LR
    PDF[PDF/Image] --> AI_Doc[Azure Document Intelligence]
    AI_Doc --> Tables[Extract Tables]
    AI_Doc --> Text[Extract Text]
    Tables --> MD[Markdown Conversion]
    Text --> MD
    MD --> Clean[Noise Reduction]
```

### 13. Chunking Workflow
```mermaid
graph TD
    Text[Full Document] --> Logic[Chunking Strategy]
    Logic --> Fixed[Fixed Size Overlap]
    Logic --> Semantic[Semantic Heading Split]
    Fixed --> Fragments
    Semantic --> Fragments
    Fragments --> Context[Add Parent Context]
```

### 14. Embedding Generation Pipeline
```mermaid
graph LR
    Text[Text Chunk] --> Model[Ada-002 / Text-3-Large]
    Model --> Vector[1536-dim Float Array]
    Vector --> Normalize[Vector Normalization]
    Normalize --> Store[pgvector Store]
```

### 15. Vector Indexing Lifecycle
```mermaid
stateDiagram-v2
    [*] --> Insertion: New Vector
    Insertion --> Buffer: WAL Log
    Buffer --> Indexing: HNSW / IVFFlat
    Indexing --> Optimized: Search Ready
    Optimized --> Maintenance: Index Rebuild
```

### 16. Retrieval Flow
```mermaid
graph TD
    Query[User Query] --> Embed[Embed Query]
    Embed --> Search[Vector Search]
    Search --> Filter[Metadata Filtering]
    Filter --> Rerank[Reranking Model]
    Rerank --> Context[Final Top-K Context]
```

### 17. Citation Generation Flow
```mermaid
graph LR
    Context[Retrieved Chunks] --> LLM[Generation]
    LLM --> Answer[Draft Answer]
    Answer --> SourceMatch[Source Verification]
    SourceMatch --> Final[Answer with [1,2] Citations]
```

### 18. Hybrid Search Flow
```mermaid
graph TD
    Q[Query] --> Semantic[Vector Search]
    Q --> Keyword[Full-Text Search]
    Semantic --> Score1[Score A]
    Keyword --> Score2[Score B]
    Score1 --> RRF[Reciprocal Rank Fusion]
    Score2 --> RRF
    RRF --> Results[Unified Results]
```

### 19. Data Freshness Sync Flow
```mermaid
graph TD
    SP[SharePoint] -->|Webhook| Sync[Sync Service]
    Sync -->|Check Hashes| DB[Metadata DB]
    DB -->|Change Detected| Trigger[Ingestion Worker]
    Trigger -->|Update| Index[Vector Store]
```

### 20. Reindex Workflow
```mermaid
graph LR
    Command[Admin: Trigger Reindex] --> Fetch[Fetch All Chunks]
    Fetch --> NewModel[New Embedding Model]
    NewModel --> TempIndex[Temp Shadow Index]
    TempIndex --> Swap[Atomic Atomic Swap]
    Swap --> Clean[Drop Old Index]
```

### 21. Zero Trust Trust-Boundary Model
```mermaid
graph TD
    User -->|Identity| WAF[Web Application Firewall]
    WAF -->|Validated| Front[Frontend Boundary]
    Front -->|mTLS| API[API Boundary]
    API -->|RBAC| DB[Data Boundary]
    API -->|Private Link| LLM[AI Boundary]
```

### 22. OIDC / SSO Authentication Flow
```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant IDP as Entra ID
    
    U->>A: Click Login
    A->>IDP: Redirect to Authorize
    IDP->>U: Request Credentials
    U->>IDP: MFA / Password
    IDP-->>A: Authorization Code
    A->>IDP: Exchange Code for Token
    IDP-->>A: JWT ID Token
```

### 23. RBAC Permission Model
```mermaid
graph LR
    User[User] --> Role{Role Assignment}
    Role -->|User| Chat[Chat Interface]
    Role -->|Analyst| Reports[Analytics Dash]
    Role -->|Admin| Config[System Config]
    Role -->|Prompt Eng| Lab[Prompt Lab]
```

### 24. Secrets Management Flow
```mermaid
graph TD
    App[FastAPI] -->|Managed Identity| KV[Azure Key Vault]
    KV -->|Retrieve| Secret[OpenAI Key]
    Secret -->|Inject| Memory[App Memory]
    KV -.->|Rotate| NewKey[New OpenAI Key]
```

### 25. Private Networking Topology
```mermaid
graph TD
    User -->|Public IP| AppGateway[Azure App Gateway]
    subgraph "Private VNet"
        AppGateway -->|Private IP| AKS[Private AKS]
        AKS -->|Private Endpoint| SQL[Azure SQL]
        AKS -->|Private Link| OpenAI[Azure OpenAI]
    end
```

### 26. WAF Security Boundary
```mermaid
graph LR
    Traffic[Internet Traffic] --> WAF[WAF / Front Door]
    WAF -->|SQLi Check| Block1[Block Malicious]
    WAF -->|XSS Check| Block2[Block Malicious]
    WAF -->|DDoS Protect| Filter[Clean Traffic]
    Filter --> Ingress[AKS Ingress]
```

### 27. PII Redaction Pipeline
```mermaid
graph TD
    Input[User Message] --> NER[Entity Recognition]
    NER -->|Found| PII[Email/SSN/Phone]
    PII --> Replace[Redact/Anonymize]
    Replace --> Safe[Safe Message]
    Safe --> LLM[OpenAI]
```

### 28. Audit Logging Architecture
```mermaid
graph LR
    API[API Events] --> Queue[Event Hub]
    Queue --> Storage[Blob Storage]
    Queue --> LogAnalytics[Log Analytics]
    LogAnalytics --> Sentinel[Azure Sentinel]
```

### 29. Key Rotation Lifecycle
```mermaid
stateDiagram-v2
    [*] --> Active: Key v1
    Active --> Expiring: 30 Days Left
    Expiring --> Rotate: Generate v2
    Rotate --> Grace: Both Active
    Grace --> Deprecated: v1 Removed
    Deprecated --> [*]
```

### 30. Incident Response Flow
```mermaid
graph TD
    Alert[Monitoring Alert] --> Pager[PagerDuty / OpsGenie]
    Pager --> Team[Ops Team]
    Team --> Analyze[Sentinel Investigation]
    Analyze --> Remediate[Apply Patch/Config]
    Remediate --> PostMortem[Record Lessons]
```

### 31. GitHub Actions Pipeline
```mermaid
graph TD
    Push[Code Push] --> Lint[Linting / Formatting]
    Lint --> Test[Unit / Integration Tests]
    Test --> Build[Docker Build]
    Build --> Scan[Trivy Vulnerability Scan]
    Scan --> PushRepo[Push to ACR]
    PushRepo --> DeployDev[Deploy to Dev AKS]
```

### 32. Terraform Deployment Workflow
```mermaid
graph LR
    TF_Code[Terraform Code] --> Plan[TF Plan]
    Plan --> Approval[Review Approval]
    Approval --> Apply[TF Apply]
    Apply --> State[Update S3 State]
```

### 33. Docker Image Promotion Flow
```mermaid
stateDiagram-v2
    [*] --> DevRegistry: Build v1.0.0
    DevRegistry --> Staging: Passed Dev QA
    Staging --> ProdRegistry: Tag v1.0.0-Stable
    ProdRegistry --> Production: Blue/Green Swap
```

### 34. AKS Deployment Flow
```mermaid
graph TD
    Helm[Helm Chart] --> Release[Helm Release]
    Release --> Pods[Update ReplicaSet]
    Pods --> Health[Readiness Probe]
    Health -->|Success| Active[Active Service]
```

### 35. Rollback Workflow
```mermaid
graph LR
    Alert[Failure Detected] --> Command[Helm Rollback]
    Command --> Prev[Previous ReplicaSet]
    Prev --> Traffic[Traffic Re-routed]
    Traffic --> Recovery[System Restored]
```

### 36. Drift Detection Workflow
```mermaid
graph TD
    Cron[Daily Job] --> Plan[TF Plan]
    Plan --> Diff{Drift Detected?}
    Diff -->|Yes| Notify[Slack Alert]
    Diff -->|No| Success[End]
```

### 37. Branching Strategy Model
```mermaid
graph LR
    Feat[Feature Branch] -->|PR| Develop[Develop Branch]
    Develop -->|Merge| Release[Release Branch]
    Release -->|Tag| Main[Main / Prod Branch]
```

### 38. Release Management Workflow
```mermaid
graph TD
    Spec[Feature Spec] --> Dev[Sprint Development]
    Dev --> QA[Quality Assurance]
    QA --> Signoff[Business Sign-off]
    Signoff --> Prod[Production Release]
```

### 39. Metrics Pipeline
```mermaid
graph LR
    Pod[App Pods] -->|Scrape| Prom[Prometheus]
    Prom -->|Query| Grafana[Grafana Dashboards]
    Grafana --> Alerts[Alertmanager]
```

### 40. Logging Pipeline
```mermaid
graph TD
    App[Containers] -->|stdout| FluentBit[FluentBit]
    FluentBit -->|Forward| Storage[Log Analytics]
    Storage --> Kusto[Kusto Queries]
    Kusto --> Dash[Insights Dashboard]
```

### 41. Distributed Tracing Flow
```mermaid
sequenceDiagram
    participant UI as Browser
    participant API as API
    participant DB as Postgres
    participant AI as OpenAI
    
    UI->>API: Request (Span ID: 123)
    API->>DB: Query (Span ID: 123.1)
    DB-->>API: Data
    API->>AI: Prompt (Span ID: 123.2)
    AI-->>API: Response
    API-->>UI: Result
```

### 42. Alert Escalation Workflow
```mermaid
graph TD
    Crit[Critical Alert] --> Slack[Slack Notification]
    Slack -->|No Response| SMS[SMS Alert]
    SMS -->|No Response| Phone[Phone Call Escalation]
```

### 43. Capacity Scaling Workflow
```mermaid
graph TD
    Load[High CPU/Memory] --> Metric[HPA Metric]
    Metric --> Scale[K8s Scale Pods]
    Scale --> AddNode[Cluster Autoscaler]
    AddNode --> Capacity[Increased Capacity]
```

### 44. Queue Worker Flow
```mermaid
graph LR
    API[API Request] -->|Push| Redis[Redis Queue]
    Redis -->|Pop| Worker[Python Worker]
    Worker -->|Execute| Task[Ingestion/Report]
    Task -->|Update| Status[Postgres Status]
```

### 45. Cost Governance Flow
```mermaid
graph TD
    Usage[Token Usage] --> Calc[Cost Calculator]
    Calc --> Budget[Budget Alert]
    Budget --> Policy[Resource Throttling]
```

### 46. SLA Monitoring Flow
```mermaid
graph LR
    Probe[Health Probes] --> Monitor[Uptime Monitor]
    Monitor -->|99.9%| Success[SLA Met]
    Monitor -->|Below| Breach[SLA Breach Alert]
```

### 47. End-User Chat Journey
```mermaid
graph TD
    Ask[User Asks Question] --> Wait[See Typing Indicator]
    Wait --> Read[Receive Streaming Answer]
    Read --> Action[Click Citation / Source]
    Action --> Feedback[Give Thumbs Up/Down]
```

### 48. Admin Onboarding Workflow
```mermaid
graph LR
    Req[New Bot Request] --> Appr[Admin Approval]
    Appr --> Create[Provision Resources]
    Create --> Config[Setup Prompt/Data]
    Config --> Ready[Bot Live]
```

### 49. Prompt Engineer Lifecycle
```mermaid
stateDiagram-v2
    [*] --> DraftPrompt: Write
    DraftPrompt --> Test: Playground
    Test --> Refine: Logic Adjust
    Refine --> Version: Tag v2.1
    Version --> Production: Deploy
```

### 50. Analyst Reporting Workflow
```mermaid
graph TD
    Logs[Raw Audit Logs] --> Query[Kusto / SQL Query]
    Query --> Visualize[PowerBI / Grafana]
    Visualize --> Review[Monthly Review]
    Review --> Strategic[Platform Roadmap]
```

---

## 🚦 Getting Started

### 1. Prerequisites
- **Azure Subscription** with OpenAI access enabled.
- **Docker Desktop** installed.
- **Terraform CLI** (v1.5+).
- **Node.js** (v18+) and **Python** (v3.11+).

### 2. Local Infrastructure (Docker Compose)
```bash
cp .env.example .env
docker-compose up --build
```

### 3. Frontend Development
```bash
cd apps/web && npm install && npm run dev
```

### 4. Backend Development
```bash
cd apps/api && pip install -r requirements.txt && uvicorn app.main:app --reload
```

---

## 🛠️ Deployment Guide

### Azure Infrastructure (Terraform)
```bash
cd infrastructure/terraform/envs/prod
terraform init
terraform apply
```

---

## 🛡️ Governance & Security
- **Identity-First**: Every request must be authenticated via OIDC.
- **Micro-Segmentation**: Network policies restrict traffic between pods.
- **Data Sovereignty**: All AI data remains within the enterprise-controlled Azure tenant.

---

## 📈 Roadmap
- [ ] **Multi-Modal Support**: Ingestion and chat with images and audio.
- [ ] **Agentic Workflows**: Tool-calling capabilities for executing actions.
- [ ] **Advanced Reranking**: Integration with Cohere/BGE rerankers.

---
<sub>&copy; 2026 Devopstrio &mdash; Engineering the Future of Enterprise Intelligence.</sub>
