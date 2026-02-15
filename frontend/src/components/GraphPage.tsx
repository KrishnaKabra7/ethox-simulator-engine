import React, { useRef, useCallback, useState } from 'react'
import ForceGraph3D from 'react-force-graph-3d'
import { useSimulationStore } from '../store/useSimulationStore'
import { FGNode, FGLink } from '../api/client'
import { SidePanel } from './SidePanel'

export function GraphPage() {
  const run = useSimulationStore((s) => s.run)
  const graph = useSimulationStore((s) => s.graph)
  const running = useSimulationStore((s) => s.running)
  const error = useSimulationStore((s) => s.error)
  const fgRef = useRef<any>(null)
  const [selected, setSelected] = useState<FGNode | null>(null)
  const [panelOpen, setPanelOpen] = useState(true)
  const [input, setInput] = useState('')

  const handleSubmit = useCallback(async () => {
    if (!input.trim()) return
    await run(input.trim(), 20)
  }, [input, run])

  const handleNodeClick = useCallback((node: any) => {
    setSelected(node as FGNode)
  }, [])

  return (
    <div className="app-root">
      <SidePanel open={panelOpen} onToggle={() => setPanelOpen((v) => !v)} node={selected} />

      <div className="graph-center">
        {error && <div className="error-banner">{error}</div>}
        <ForceGraph3D
          ref={fgRef}
          graphData={graph ?? { nodes: [], links: [] }}
          nodeLabel={(n: any) => `${n.agent_id ?? n.id}`}
          nodeAutoColorBy={(n: any) => (n.age ? Math.round(n.age / 10) : '0') as any}
          onNodeClick={handleNodeClick}
          linkWidth={(l: any) => (l.weight ?? 1) * 0.8}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>

      <div className="floating-input">
        <input
          placeholder="Enter event/message and press Run"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
        />
        <button onClick={handleSubmit} disabled={running}>{running ? 'Running…' : 'Run'}</button>
      </div>
    </div>
  )
}
