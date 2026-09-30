import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const API = import.meta.env.VITE_API_URL;


const presets = {
  normal: { amount: 1200, average_amount: 2000, new_beneficiary: false, new_device: false, unusual_location: false, unusual_time: false, daily_transactions: 3 },
  suspicious: { amount: 18000, average_amount: 2000, new_beneficiary: true, new_device: false, unusual_location: false, unusual_time: true, daily_transactions: 4 },
  high: { amount: 75000, average_amount: 2000, new_beneficiary: true, new_device: true, unusual_location: true, unusual_time: true, daily_transactions: 12 }
};

function App() {
  const [tx, setTx] = useState(presets.high);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agentResult, setAgentResult] = useState(null);

  const update = (key, value) => setTx({...tx, [key]: value});

  async function analyze() {
    setLoading(true); setResult(null);
    try {
      const r = await fetch(`${API}/analyze`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(tx) });
      setResult(await r.json());
    } catch { setResult({error:'Backend not running. Start Node.js on port 5000.'}); }
    setLoading(false);
  }

  async function checkAgent(amount) {
    const r = await fetch(`${API}/agent-check`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({amount, approved_limit:70000}) });
    setAgentResult(await r.json());
  }

  return <div className="app">
    <header><div><div className="logo">TP</div></div><div><h1>TrustPay AI</h1><p>Explainable Payment Trust & Intervention Layer</p></div><span className="live">● DEMO MODE</span></header>

    <main>
      <section className="hero"><div><span className="eyebrow">REAL-TIME PAYMENT PROTECTION</span><h2>Detect risk. Explain risk. Protect the payment.</h2><p>TrustPay AI evaluates transaction context and recommends the safest next action without connecting to real banking rails.</p></div></section>

      <section className="grid">
        <div className="card">
          <div className="card-title"><h3>Payment Simulator</h3><span>STEP 01</span></div>
          <label>Transaction Amount</label><input type="number" value={tx.amount} onChange={e=>update('amount', Number(e.target.value))}/>
          <label>Normal Average Amount</label><input type="number" value={tx.average_amount} onChange={e=>update('average_amount', Number(e.target.value))}/>
          <div className="toggles">
            {[["new_beneficiary","New beneficiary"],["new_device","New device"],["unusual_location","Unusual location"],["unusual_time","Unusual time"]].map(([k,l])=><label className="toggle" key={k}><input type="checkbox" checked={tx[k]} onChange={e=>update(k,e.target.checked)}/><span>{l}</span></label>)}
          </div>
          <button className="primary" onClick={analyze}>{loading?'Analyzing…':'Analyze Payment'}</button>
          <div className="presets"><button onClick={()=>setTx(presets.normal)}>Normal</button><button onClick={()=>setTx(presets.suspicious)}>Suspicious</button><button onClick={()=>setTx(presets.high)}>High Risk</button></div>
        </div>

        <div className="card result-card">
          <div className="card-title"><h3>Trust Decision</h3><span>STEP 02</span></div>
          {!result ? <div className="empty"><div className="shield">✓</div><h3>Ready to analyze</h3><p>Choose a scenario or enter your own payment details.</p></div> : result.error ? <div className="error">{result.error}</div> : <>
            <div className={`score ${result.risk_level.toLowerCase()}`}><div><small>RISK SCORE</small><strong>{result.risk_score}<em>/100</em></strong></div><b>{result.risk_level} RISK</b></div>
            <div className="decision"><span>RECOMMENDED ACTION</span><strong>{result.decision}</strong></div>
            <p className="message">{result.message}</p>
            <h4>Why?</h4><ul>{result.reasons.map((x,i)=><li key={i}>⚠ {x}</li>)}</ul>
          </>}
        </div>
      </section>

      <section className="examples"><h2>Demo Scenarios</h2><div className="example-grid">
        <Example title="Normal Payment" amount="₹1,200" score="12/100" action="ALLOW" cls="low" onClick={()=>{setTx(presets.normal);setResult(null)}}/>
        <Example title="Suspicious Payment" amount="₹18,000" score="67/100" action="VERIFY" cls="medium" onClick={()=>{setTx(presets.suspicious);setResult(null)}}/>
        <Example title="High-Risk Payment" amount="₹75,000" score="94/100" action="HOLD" cls="high" onClick={()=>{setTx(presets.high);setResult(null)}}/>
      </div></section>

      <section className="agent card"><div><span className="eyebrow">FUTURE-READY FEATURE</span><h2>AI-Agent Payment Protection</h2><p>An AI shopping agent can request payment, but TrustPay checks the user's approved spending limit before allowing it.</p></div><div className="agent-box"><div><b>Approved limit</b><strong>₹70,000</strong></div><div><b>Agent request</b><strong>₹1,35,000</strong></div><button className="secondary" onClick={()=>checkAgent(135000)}>Check Agent Request</button>{agentResult && <div className={`agent-result ${agentResult.allowed?'ok':'warn'}`}>{agentResult.decision} — {agentResult.message}</div>}</div></section>
    </main>
    <footer>TrustPay AI • Hackathon Prototype • Simulated transactions only</footer>
  </div>
}

function Example({title,amount,score,action,cls,onClick}) { return <button className="example" onClick={onClick}><span className={`dot ${cls}`}></span><div><b>{title}</b><small>{amount}</small></div><div className="example-right"><strong>{score}</strong><span>{action}</span></div></button> }

createRoot(document.getElementById('root')).render(<App/>);
