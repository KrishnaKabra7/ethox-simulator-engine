export interface FGNode {
  id: string | number
  agent_id?: string | number
  traits?: Record<string, number>
  age?: number
  gender?: string
  level_of_care?: number
  initial_opinion?: string
  text_opinion?: string
}

export interface FGLink {
  source: string | number
  target: string | number
  weight?: number
}

export interface RunSimulationResponse {
  simulation_id: string
  initial_graph: { nodes: FGNode[]; edges: FGLink[] }
  post_trigger_graph?: { nodes: FGNode[]; edges: FGLink[] }
  final_graph: { nodes: FGNode[]; edges: FGLink[] }
}

const BASE = '' // relative; expects backend at same origin

export async function runSimulation(trigger: string, num_agents: number): Promise<RunSimulationResponse> {
  const res = await fetch(`${BASE}/api/simulations/run/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ trigger, num_agents }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function fetchGraph(): Promise<{ nodes: FGNode[]; edges: FGLink[] }> {
  const res = await fetch('/api/graph/')
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
