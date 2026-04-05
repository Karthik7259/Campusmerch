const CURRENCY = 'INR'

export const trackEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  window.gtag('event', eventName, params)
}

export const buildAnalyticsItem = (product, options = {}) => {
  if (!product) {
    return null
  }

  const quantity = Number(options.quantity ?? 1) || 1
  const price = Number(options.price ?? product.price) || 0
  const size = options.size && options.size !== 'default' ? options.size : undefined

  return {
    item_id: product._id || options.productId,
    item_name: product.name || options.productName,
    item_category: product.category || options.category,
    item_variant: size,
    price,
    quantity,
  }
}

export const trackSelectItem = ({ product, listName = 'product_listing' }) => {
  const item = buildAnalyticsItem(product)
  if (!item) {
    return
  }

  trackEvent('select_item', {
    item_list_name: listName,
    items: [item],
  })
}

export const trackViewItem = ({ product, price }) => {
  const item = buildAnalyticsItem(product, { price })
  if (!item) {
    return
  }

  trackEvent('view_item', {
    currency: CURRENCY,
    value: item.price,
    items: [item],
  })
}

export const trackAddToCart = ({ product, size, quantity = 1, price }) => {
  const item = buildAnalyticsItem(product, { size, quantity, price })
  if (!item) {
    return
  }

  trackEvent('add_to_cart', {
    currency: CURRENCY,
    value: item.price * item.quantity,
    items: [item],
  })
}

export const trackBeginCheckout = ({ items, value, tax = 0, shipping = 0 }) => {
  if (!items?.length) {
    return
  }

  trackEvent('begin_checkout', {
    currency: CURRENCY,
    value: Number(value) || 0,
    tax: Number(tax) || 0,
    shipping: Number(shipping) || 0,
    items,
  })
}

export const trackAddPaymentInfo = ({ items, value, paymentType, tax = 0, shipping = 0 }) => {
  if (!items?.length) {
    return
  }

  trackEvent('add_payment_info', {
    currency: CURRENCY,
    value: Number(value) || 0,
    payment_type: paymentType,
    tax: Number(tax) || 0,
    shipping: Number(shipping) || 0,
    items,
  })
}

export const trackPurchase = ({
  transactionId,
  items,
  value,
  tax = 0,
  shipping = 0,
  paymentType,
}) => {
  if (!transactionId || !items?.length) {
    return
  }

  trackEvent('purchase', {
    transaction_id: transactionId,
    currency: CURRENCY,
    value: Number(value) || 0,
    tax: Number(tax) || 0,
    shipping: Number(shipping) || 0,
    payment_type: paymentType,
    items,
  })
}
