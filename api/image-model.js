function keyForProvider(provider) {
  return provider === "grsai" ? process.env.GRSAI_API_KEY : process.env.PPIO_API_KEY;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    provider = "ppio",
    label = "生图模型",
    model,
    prompt,
    referenceImages = [],
    size,
    quality,
    background,
    output_format,
    aspect_ratio,
    textToImageUrl,
    editUrl,
    url
  } = req.body || {};

  const apiKey = keyForProvider(provider);
  if (!apiKey) {
    return res.status(500).json({ message: `${label} 缺少服务端环境变量 API Key` });
  }

  const references = Array.isArray(referenceImages) ? referenceImages.filter(Boolean) : [];
  const bodySize = Buffer.byteLength(JSON.stringify(req.body || {}), "utf8");
  if (bodySize > 4 * 1024 * 1024) {
    return res.status(413).json({
      message: "请求体过大：请使用压缩后的参考图，或减少本次传入的参考图数量。"
    });
  }
  let endpoint = url;
  let payload;

  if (provider === "ppio") {
    endpoint = references.length ? editUrl : textToImageUrl;
    payload = {
      prompt,
      n: 1,
      size,
      quality,
      background,
      output_format
    };
    if (references.length) {
      payload.image = references.length === 1 ? references[0] : references;
    }
  } else if (provider === "grsai") {
    endpoint = url || "https://grsaiapi.com/v1/api/generate";
    payload = {
      model,
      prompt,
      n: 1,
      size,
      quality,
      background,
      output_format,
      aspect_ratio
    };
    if (references.length) {
      payload.image_urls = references;
    }
  } else {
    return res.status(400).json({ message: `不支持的生图模型供应商：${provider}` });
  }

  const upstream = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  const data = await upstream.json().catch(() => ({}));
  return res.status(upstream.status).json(data);
}
