import { Database, Globe, Layers, Server } from "lucide-react";

const NODES = [
  { icon: Globe, label: "Client", note: "requisição HTTP" },
  { icon: Server, label: "API", note: "controller / REST" },
  { icon: Layers, label: "Service", note: "regras de negócio" },
  { icon: Database, label: "Database", note: "persistência" },
];

const ENDPOINTS = [
  { method: "POST", path: "/api/auth/login", status: "200" },
  { method: "GET", path: "/api/usuarios/{id}", status: "200" },
  { method: "POST", path: "/api/usuarios", status: "201" },
];

/** Composição visual original: painel de código + fluxo Client → API → Service → Database. */
export function ArchitectureDiagram() {
  return (
    <div className="relative" aria-hidden>
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-20 blur-3xl"
        style={{ background: "var(--gradient-brand)" }}
      />

      <div className="panel animate-float-soft overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border/80 px-4 py-3">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-accent/60" />
          <span className="size-2.5 rounded-full bg-primary/70" />
          <span className="ml-2 font-mono text-[0.7rem] text-muted-foreground">
            UsuarioController.java
          </span>
        </div>

        <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.72rem] leading-relaxed text-muted-foreground sm:text-xs">
          <code>
            {`@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

  private final UsuarioService service;

  @PostMapping
  public ResponseEntity<UsuarioDTO> criar(
      @RequestBody @Valid UsuarioRequest req) {
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(service.criar(req));
  }
}`}
          </code>
        </pre>

        <div className="border-t border-border/80 px-4 py-4">
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase">
            endpoints
          </p>
          <ul className="mt-3 space-y-2">
            {ENDPOINTS.map((e) => (
              <li
                key={e.path}
                className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/50 px-3 py-2 font-mono text-[0.7rem]"
              >
                <span className="rounded bg-primary/15 px-1.5 py-0.5 text-primary">{e.method}</span>
                <span className="flex-1 truncate text-foreground/80">{e.path}</span>
                <span className="text-accent">{e.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="panel mt-4 px-4 py-5">
        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase">
          fluxo da requisição
        </p>
        <ol className="mt-4 grid grid-cols-4 items-start gap-1 sm:gap-2">
          {NODES.map((node, i) => (
            <li key={node.label} className="relative flex flex-col items-center text-center">
              {i < NODES.length - 1 ? (
                <svg
                  className="absolute top-5 left-1/2 h-2 w-full text-primary/60"
                  viewBox="0 0 100 4"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1="2"
                    x2="100"
                    y2="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    className="animate-dash-flow"
                  />
                </svg>
              ) : null}
              <span className="relative z-10 flex size-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                <node.icon className="size-4" />
              </span>
              <span className="mt-2 font-mono text-[0.68rem] text-foreground/90">{node.label}</span>
              <span className="mt-0.5 hidden text-[0.62rem] leading-tight text-muted-foreground sm:block">
                {node.note}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
