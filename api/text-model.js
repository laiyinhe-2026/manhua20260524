const TEXT_ENDPOINTS = {
  ppio: "https://api.ppio.com/openai/v1/chat/completions",
  grsai: "https://grsaiapi.com/v1/chat/completions"
};

function keyForProvider(provider) {
  return provider === "grsai" ? process.env.GRSAI_API_KEY : process.env.PPIO_API_KEY;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { provider = "ppio", model, messages, temperature = 0.7, label = "文字模型" } = req.body || {};
  const apiKey = keyForProvider(provider);
  if (!apiKey) {
    return res.status(500).json({ message: `${label} 缺少服务端环境变量 API Key` });
  }

  const endpoint = TEXT_ENDPOINTS[provider];
  if (!endpoint) {
    return res.status(400).json({ message: `不支持的文字模型供应商：${provider}` });
  }

  const upstream = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({ model, messages, temperature })
  });

  const data = await upstream.json().catch(() => ({}));
  return res.status(upstream.status).json(data);
}
