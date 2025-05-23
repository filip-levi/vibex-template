import { Mermaid } from '@/components/ui/mermaid';

const diagram = `
graph TD
    A[Home Page] --> B[Agent Grid]
    A --> C[FAQ Section]
    A --> D[Footer]
    
    B --> E[Agent Cards]
    E --> F[Agent Details]
    F --> G[Agent Chat Interface]
    
    subgraph Agent Card Features
        E --> H[Name & Role]
        E --> I[Description]
        E --> J[Connect Button]
        E --> K[Hover Effects]
    end
    
    subgraph Chat Interface
        G --> L[Voice Controls]
        G --> M[Message History]
        G --> N[Real-time Communication]
    end
    
    subgraph Agent Types
        O[Research Assistant]
        P[Data Analyst]
        Q[Creative Writer]
        R[Code Assistant]
        S[Customer Support]
    end
    
    style A fill:#3b82f6,color:white
    style B fill:#60a5fa,color:white
    style G fill:#93c5fd,color:white
`;

export default function DiagramPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Application Structure</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Mermaid chart={diagram} className="w-full overflow-auto" />
      </div>
    </div>
  );
}
