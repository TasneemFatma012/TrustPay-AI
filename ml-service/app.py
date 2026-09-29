from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def analyze(tx):
    score = 5
    reasons = []

    amount = float(tx.get("amount", 0))
    avg = float(tx.get("average_amount", 2000))
    new_beneficiary = bool(tx.get("new_beneficiary", False))
    new_device = bool(tx.get("new_device", False))
    unusual_location = bool(tx.get("unusual_location", False))
    unusual_time = bool(tx.get("unusual_time", False))
    frequency = int(tx.get("daily_transactions", 2))

    ratio = amount / max(avg, 1)
    if ratio >= 10:
        score += 28
        reasons.append(f"Amount is {ratio:.1f}× above the user's normal average")
    elif ratio >= 5:
        score += 20
        reasons.append(f"Amount is {ratio:.1f}× above the user's normal average")
    elif ratio >= 3:
        score += 12
        reasons.append("Transaction amount is unusually high")

    if new_beneficiary:
        score += 20
        reasons.append("New beneficiary")
    if new_device:
        score += 20
        reasons.append("New device detected")
    if unusual_location:
        score += 15
        reasons.append("Unusual payment location")
    if unusual_time:
        score += 8
        reasons.append("Unusual payment time")
    if frequency >= 10:
        score += 8
        reasons.append("Unusually high transaction frequency")

    score = min(score, 99)

    if score <= 30:
        level = "LOW"
        decision = "ALLOW"
        message = "Payment looks consistent with the user's usual activity."
    elif score <= 70:
        level = "MEDIUM"
        decision = "VERIFY"
        message = "Additional verification is recommended before completing the payment."
    else:
        level = "HIGH"
        decision = "HOLD"
        message = "Payment should be held for additional authentication or review."

    return {
        "risk_score": score,
        "risk_level": level,
        "decision": decision,
        "reasons": reasons or ["No significant anomaly detected"],
        "message": message,
    }


@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "TrustPay AI Risk Engine"})


@app.post("/analyze")
def analyze_route():
    data = request.get_json(silent=True) or {}
    return jsonify(analyze(data))


@app.post("/agent-check")
def agent_check():
    data = request.get_json(silent=True) or {}
    amount = float(data.get("amount", 0))
    limit = float(data.get("approved_limit", 0))
    if amount <= limit:
        return jsonify({
            "allowed": True,
            "decision": "ALLOW",
            "risk_score": 14,
            "message": "Agent request is within the user's approved payment limit."
        })
    return jsonify({
        "allowed": False,
        "decision": "ASK_USER",
        "risk_score": 91,
        "message": "Agent request exceeds the user's approved payment limit."
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
