import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import QRCode from 'qrcode';
import { PublicKey } from '@solana/web3.js';
import {
  Bot,
  CheckCircle2,
  ChefHat,
  Clipboard,
  ExternalLink,
  Leaf,
  QrCode,
  ReceiptText,
  ScanLine,
  ShieldCheck,
  ShoppingBasket,
  WalletCards
} from 'lucide-react';
import './styles.css';

const DEMO_RECIPIENT = '11111111111111111111111111111111';
const MERCHANT_WALLET = import.meta.env.VITE_MERCHANT_WALLET || DEMO_RECIPIENT;

type Order = {
  id: string;
  title: string;
  customer: string;
  ingredients: string[];
  amount: number;
  memo: string;
  status: string;
  image: string;
};

const orders: Order[] = [
  {
    id: 'sally-lunch-042',
    title: 'Chicken Power Bowl',
    customer: 'Sally lunch basket',
    ingredients: ['chicken', 'quinoa', 'avocado', 'tomato', 'greens'],
    amount: 12.5,
    memo: 'HeySalad Sally basket settlement',
    status: 'Order verified and ready for payment.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=260&q=80'
  },
  {
    id: 'kitchen-restock-118',
    title: 'Kitchen Restock',
    customer: 'Cloud kitchen operator',
    ingredients: ['olive oil', 'rice', 'lime', 'beans', 'spinach'],
    amount: 42.5,
    memo: 'HeySalad agent restock settlement',
    status: 'Merchant risk checked. Review optional.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=260&q=80'
  },
  {
    id: 'creator-meal-plan-277',
    title: 'Paid Recipe Access',
    customer: 'Creator food product',
    ingredients: ['salmon', 'ginger', 'broccoli', 'sweet potato'],
    amount: 4.99,
    memo: 'HeySalad paid recipe access',
    status: 'Creator checkout generated.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=260&q=80'
  }
];

function makeSolanaPayUrl(order: Order) {
  const recipient = new PublicKey(MERCHANT_WALLET).toBase58();
  const params = new URLSearchParams({
    amount: order.amount.toFixed(2),
    label: 'HeySalad Pay',
    message: order.title,
    memo: `${order.memo} / ${order.id}`
  });

  return `solana:${recipient}?${params.toString()}`;
}

function App() {
  const [order, setOrder] = useState<Order>(orders[0]);
  const [qr, setQr] = useState('');
  const [copied, setCopied] = useState(false);

  const solanaPayUrl = useMemo(() => makeSolanaPayUrl(order), [order]);

  useEffect(() => {
    QRCode.toDataURL(solanaPayUrl, {
      margin: 1,
      width: 360,
      color: { dark: '#000000', light: '#ffffff' }
    }).then(setQr);
  }, [solanaPayUrl]);

  const copyPayment = async () => {
    await navigator.clipboard.writeText(solanaPayUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="appShell">
      <section className="phoneSurface" aria-label="HeySalad Solana Pay mobile dApp">
        <header className="topBar">
          <button className="iconButton" aria-label="Open menu">
            <ScanLine size={22} />
          </button>
          <div className="brand">
            <div className="brandText">
              <img className="brandWordmark" src="/heysalad-logo-black.png" alt="HeySalad" />
              <span>Pay Agent</span>
            </div>
          </div>
          <div className="chainPill" aria-label="Solana network">
            <span className="solanaGlyph">≋</span>
            Solana
          </div>
        </header>

        <section className="orderSection">
          <div className="sectionHeader">
            <h1>Your Order</h1>
            <button>Edit</button>
          </div>

          <div className="orderSelector" aria-label="Example order selection">
            {orders.map((item) => (
              <button
                key={item.id}
                className={item.id === order.id ? 'orderChip active' : 'orderChip'}
                onClick={() => setOrder(item)}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="orderSummary">
            <img src={order.image} alt="" />
            <div>
              <h2>{order.title}</h2>
              <p>{order.ingredients.slice(0, 4).join(', ')}</p>
            </div>
            <strong>{order.amount.toFixed(2)} USDC</strong>
          </div>

          <div className="totalRow">
            <span>1 item</span>
            <strong>{order.amount.toFixed(2)} USDC</strong>
          </div>
        </section>

        <section className="agentCard">
          <div className="agentAvatar">
            <Bot size={34} />
          </div>
          <div>
            <h2>HeySalad AI Agent</h2>
            <p>{order.status}</p>
            <span><CheckCircle2 size={14} /> Ready to pay</span>
          </div>
        </section>

        <section className="insideSection">
          <h2><Leaf size={20} /> What's inside</h2>
          <div className="ingredientScroller">
            {order.ingredients.map((ingredient) => (
              <span key={ingredient}>{ingredient}</span>
            ))}
          </div>
        </section>

        <section className="paymentSection">
          <div className="paymentHeader">
            <h2><WalletCards size={24} /> Pay with Solana</h2>
            <div>
              <span>09:48</span>
              <small>Payment expires in</small>
            </div>
          </div>

          <div className="paymentGrid">
            <div className="qrFrame">
              {qr ? <img src={qr} alt="Solana Pay QR code" /> : <QrCode size={160} />}
            </div>
            <div className="amountBlock">
              <span>Amount</span>
              <strong>{order.amount.toFixed(2)}</strong>
              <em>USDC</em>
              <p><ShieldCheck size={15} /> Secure · Onchain · Instant</p>
            </div>
          </div>

          <div className="actions">
            <button className="primaryAction" onClick={copyPayment}>
              <Clipboard size={18} /> {copied ? 'Copied' : 'Copy payment link'}
            </button>
            <a className="secondaryAction" href={solanaPayUrl}>
              <ExternalLink size={18} /> Open in wallet
            </a>
          </div>

          <code>{solanaPayUrl}</code>
        </section>

        <nav className="bottomNav" aria-label="Mobile dApp navigation">
          <a href="#orders"><ReceiptText size={22} /> Orders</a>
          <a className="scanActive" href="#scan"><QrCode size={24} /> Scan</a>
          <a href="#wallet"><WalletCards size={22} /> Wallet</a>
        </nav>
      </section>

      <aside className="desktopContext" aria-label="Project context">
        <p>Mobile-focused dApp prototype</p>
        <h2>AI food agents that settle orders with Solana Pay.</h2>
        <ul>
          <li><ShoppingBasket size={18} /> Food intent becomes a payable order.</li>
          <li><ChefHat size={18} /> Built for kitchens, grocery flows and creator recipes.</li>
          <li><WalletCards size={18} /> Wallet-native checkout with Solana Pay links.</li>
        </ul>
      </aside>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
