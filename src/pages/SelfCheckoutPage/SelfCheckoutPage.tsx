import React from 'react';
import './SelfCheckoutPage.css';
import { useSelfCheckoutLogic } from './SelfCheckoutPage.logic';
import { SelfCheckoutPanel } from './SelfCheckoutPanel';
import { Buttons } from './Buttons';

const SelfCheckoutPage: React.FC = () => {
  const logic = useSelfCheckoutLogic();

  return (
    <div className="self-checkout-page">
      <div className="top-panel">
        <SelfCheckoutPanel totalItems={logic.totalItems} totalPrice={logic.totalPrice} />
      </div>
      <div className="bottom-panel">
        <Buttons handlePay={logic.handlePay} />
      </div>
    </div>
  );
};

export default SelfCheckoutPage;
