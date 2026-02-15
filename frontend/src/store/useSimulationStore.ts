import create from 'zustand'
import { runSimulation } from '../api/client'

type GraphData = { nodes: any[]; links: any[] }

interface State {
  running: boolean
  simulationId?: string | null
  graph?: GraphData | null
  error?: string | null
  run: (trigger: string, numAgents: number) => Promise<void>
  setGraph: (g: GraphData) => void
}

export const useSimulationStore = create<State>((set) => ({
  running: false,
  simulationId: null,
  graph: null,
  error: null,
  setGraph: (g) => set({ graph: g }),
  run: async (trigger, numAgents) => {
    set({ running: true, error: null })
    try {
      const data = await runSimulation(trigger, numAgents)
      // prefer final_graph if present
      const graph = data.final_graph ?? data.post_trigger_graph ?? data.initial_graph
      set({ graph: { nodes: graph.nodes, links: graph.edges }, simulationId: data.simulation_id })
    } catch (e: any) {
      set({ error: String(e?.message ?? e), graph: null })
    } finally {
      set({ running: false })
    }
  },
}))
