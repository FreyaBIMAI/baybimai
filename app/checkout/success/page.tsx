import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="checkout-result">
      <section className="checkout-result-card">
        <p className="eyebrow checkout-eyebrow">
          <span />
          PAYMENT RECEIVED
        </p>
        <div className="success-mark" aria-hidden="true">
          ✓
        </div>
        <h1>谢谢，付款信息已收到。</h1>
        <p>
          Stripe 正在确认这笔付款。确认完成后，我们会通过你的付款邮箱发送
          Revit 闪电入门课的开通说明。
        </p>
        <Link className="return-link" href="/">
          返回 BAYBIMAI 首页
        </Link>
      </section>
    </main>
  );
}
