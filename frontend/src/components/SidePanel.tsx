import React from 'react'

export function SidePanel({ open, onToggle, node }: { open: boolean; onToggle: () => void; node: any | null }) {
  return (
    <aside className={`sidepanel ${open ? 'open' : 'closed'}`}>
      <div className="sidepanel-header">
        <h3>Agent details</h3>
        <button onClick={onToggle}>{open ? '⟨' : '⟩'}</button>
      </div>
      <div className="sidepanel-body">
        {!node && <div className="empty">Click a node to see details</div>}
        {node && (
          <div>
            <div><strong>Agent</strong>: {String(node.agent_id ?? node.id)}</div>
            {node.age != null && <div>Age: {node.age}</div>}
            {node.gender && <div>Gender: {node.gender}</div>}
            {node.level_of_care != null && <div>Care: {node.level_of_care}</div>}
            {node.initial_opinion && (
              <div>
                <h4>Initial opinion</h4>
                <p>{node.initial_opinion}</p>
              </div>
            )}
            {node.text_opinion && (
              <div>
                <h4>Final opinion</h4>
                <p>{node.text_opinion}</p>
              </div>
            )}
            {node.traits && (
              <div>
                <h4>Traits</h4>
                <ul>
                  {Object.entries(node.traits).map(([k, v]) => (
                    <li key={k}>{k}: {(v as number).toFixed(2)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
