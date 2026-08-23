export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { paymentKey, orderId, amount } = req.body;

    if (!paymentKey || !orderId || !amount) {
      return res.status(400).json({ message: '필수 파라미터가 누락되었습니다.' });
    }

    // 토스페이먼츠 시크릿 키 (Vercel 환경 변수 TOSS_SECRET_KEY 가 있으면 사용, 없으면 테스트 키 사용)
    const widgetSecretKey = process.env.TOSS_SECRET_KEY || 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6'; 
    const encryptedSecretKey = Buffer.from(`${widgetSecretKey}:`).toString('base64');

    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encryptedSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Toss Reject Response:', data);
      throw new Error(data.message || '결제 승인 거절됨');
    }

    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Toss Payments Confirm Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
