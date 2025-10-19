import dynamic from 'next/dynamic';
const PayPalButton = dynamic(()=>import('@/app/components/PayPalButton'), { ssr: false });

export default function CheckoutPage(){
  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-semibold">Checkout (PayPal)</h1>
      <p className="text-white/70 mt-2">Test a $1.99 song purchase in sandbox mode.</p>
      <div className="mt-4">
        <PayPalButton totalCents={199} description="Sample Song" />
      </div>
    </div>
  );
}
