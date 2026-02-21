// ROUTELY Process Flow Data - Complete process definitions from documentation
export const PROCESS_FLOWS = [
  {
    id: 'onboarding',
    title: 'Registration & Onboarding',
    icon: 'person-add',
    color: '#4F46E5',
    description: 'User registration, verification, and role selection (Sender or Driver)',
    steps: [
      { id: '1.1', title: 'Download & Launch', description: 'User downloads ROUTELY from App Store/Play Store and opens the app for the first time.', actor: 'User' },
      { id: '1.2', title: 'Role Selection', description: 'User selects role: "I want to SEND parcels" or "I want to DELIVER parcels (earn money)". Dual-role accounts available.', actor: 'User' },
      { id: '1.3', title: 'Phone Verification', description: 'Enter mobile number. System sends OTP via SMS. Verify with 6-digit code. 3 attempts allowed.', actor: 'System' },
      { id: '1.4', title: 'Profile Setup', description: 'Enter name, email, profile photo. Driver: additionally upload NIC, driving license, vehicle registration.', actor: 'User' },
      { id: '1.5', title: 'Document Verification', description: 'System verifies driver documents (NIC, license, vehicle). Status: Pending → Under Review → Approved. Takes 24-48 hours.', actor: 'System' },
      { id: '1.6', title: 'Payment Setup', description: 'Add payment method (card/digital wallet). Driver: add bank account for payouts. PCI-DSS compliant tokenisation.', actor: 'User' },
      { id: '1.7', title: 'Welcome Tutorial', description: 'Interactive walkthrough showing key features. Sender: how to book. Driver: how to plan routes and earn.', actor: 'System' },
    ]
  },
  {
    id: 'courier',
    title: 'Courier Aggregation Booking',
    icon: 'cube',
    color: '#7C3AED',
    description: 'Compare prices from all couriers, book with the best option, and track your parcel',
    steps: [
      { id: '2.1', title: 'New Booking', description: 'Sender taps "New Booking" on home screen. System loads booking form with saved addresses.', actor: 'Sender' },
      { id: '2.2', title: 'Enter Addresses', description: 'Enter pickup & delivery addresses with auto-complete. GPS detection for pickup. District-level validation.', actor: 'Sender' },
      { id: '2.3', title: 'Parcel Details', description: 'Enter weight (kg), dimensions, declared value (LKR), fragile toggle. System validates against courier limits.', actor: 'Sender' },
      { id: '2.4', title: 'API Quote Fetching', description: 'System queries all courier APIs simultaneously (Domex, Koombiyo, PromptXP). Target: <3 second response.', actor: 'System' },
      { id: '2.5', title: 'Compare & Select', description: 'View ranked courier cards with price, ETA, reliability score, and route-specific performance data. Performance Intelligence Engine ranks by value.', actor: 'Sender' },
      { id: '2.6', title: 'Add Insurance', description: 'Optional insurance: LKR 35 flat fee covers up to LKR 25,000. Auto-recommended for fragile or high-value items.', actor: 'Sender' },
      { id: '2.7', title: 'Payment & Confirm', description: 'Select payment method, review total breakdown. Funds placed in escrow. QR code generated for parcel.', actor: 'Sender' },
      { id: '2.8', title: 'Booking Confirmed', description: 'Courier API confirmation. Tracking number generated. Recipient notified via SMS with tracking link.', actor: 'System' },
      { id: '2.9', title: 'Track Order', description: 'Live tracking screen: courier name, tracking number, status updates, push notifications on changes.', actor: 'Sender' },
    ]
  },
  {
    id: 'directional',
    title: 'Directional Delivery Booking',
    icon: 'navigate',
    color: '#059669',
    description: 'Save 30-50% by matching with drivers already travelling your route',
    steps: [
      { id: '3.1', title: 'Select Directional', description: 'Sender taps "New Booking" → selects "Directional Delivery" tab. First-time users see how-it-works animation.', actor: 'Sender' },
      { id: '3.2', title: 'Enter Route', description: 'Enter pickup city, delivery city, preferred date range (today to +7 days). System checks route serviceability and driver supply.', actor: 'Sender' },
      { id: '3.3', title: 'Parcel Details', description: 'Enter weight, dimensions, declared value, fragile flag, special instructions. Max 20kg, 60×40×40 cm for personal vehicle.', actor: 'Sender' },
      { id: '3.4', title: 'Set Price', description: 'Review algorithm-suggested price range. Set max acceptable price. See savings comparison vs traditional courier (e.g., save LKR 350 / 54%).', actor: 'Sender' },
      { id: '3.5', title: 'Submit Listing', description: 'Review summary, accept directional delivery terms. Listing created with status "Awaiting Driver Match". 24-hour match timer starts.', actor: 'Sender' },
      { id: '3.6', title: 'Driver Matched', description: 'Push notification: "A driver has accepted your parcel!" with driver profile, photo, vehicle, rating, NIC verified badge.', actor: 'System' },
      { id: '3.7', title: 'Payment & Confirm', description: 'Payment captured, placed in escrow. QR code generated. In-app chat enabled between sender & driver. Recipient notified via SMS.', actor: 'System' },
      { id: '3.8', title: 'Fallback to Courier', description: 'If no match in 24 hours: system generates fresh courier quotes. One-tap switch to courier booking with pre-filled data.', actor: 'System' },
    ]
  },
  {
    id: 'driver',
    title: 'Driver Route Planning',
    icon: 'map',
    color: '#2563EB',
    description: 'Drivers set routes, find matching parcels, and earn money on existing trips',
    steps: [
      { id: '4.1', title: 'Plan My Route', description: 'Driver taps "Plan My Route" from Dashboard. System checks account verification status (NIC, license, vehicle).', actor: 'Driver' },
      { id: '4.2', title: 'Set Route Details', description: 'Enter origin city, destination city, departure date and time (±1 hour window). System identifies route corridor and waypoints.', actor: 'Driver' },
      { id: '4.3', title: 'Set Capacity', description: 'Set max parcels (1-10), max weight (kg), max size, fragile acceptance toggle. Estimated earnings displayed.', actor: 'Driver' },
      { id: '4.4', title: 'Find Parcels', description: 'Algorithm matches parcels by: pickup/delivery district overlap, weight fit, price range, time window. Ranked by earnings per km.', actor: 'System' },
      { id: '4.5', title: 'Review Parcels', description: 'View parcel cards: anonymised pickup/delivery area, weight, price, fragile flag, estimated detour time. Max 15km detour enforced.', actor: 'Driver' },
      { id: '4.6', title: 'Accept Parcels', description: 'Tap "Accept" on desired parcels. 30-min acceptance window. Sender notified. Optimised multi-stop pickup sequence calculated (TSP).', actor: 'Driver' },
      { id: '4.7', title: 'Lock In Route', description: 'Confirm all parcels, view total earnings, pickup sequence map. Turn-by-turn navigation ready. Push reminder 30 min before departure.', actor: 'Driver' },
    ]
  },
  {
    id: 'pickup',
    title: 'Pickup & Verification',
    icon: 'scan',
    color: '#D97706',
    description: 'Secure parcel handover with QR scanning, photo documentation, and GPS verification',
    steps: [
      { id: '5.1', title: 'View Pickups', description: 'Driver views "My Pickups Today" list sorted by optimised sequence. Full sender address revealed. Google Maps navigation launched.', actor: 'Driver' },
      { id: '5.2', title: 'Arrive at Pickup', description: 'Driver taps "I\'ve Arrived" or GPS auto-detects within 100m. System validates within 200m. Sender receives push notification.', actor: 'Driver' },
      { id: '5.3', title: 'Scan QR Code', description: 'Sender shows QR code on phone. Driver scans with in-app camera. QR is one-time-use, valid for 2 hours, HMAC signed.', actor: 'Both' },
      { id: '5.4', title: 'Photo Documentation', description: 'Driver photographs parcel: label, overall condition, any pre-existing damage. Photos auto-tagged with GPS + timestamp.', actor: 'Driver' },
      { id: '5.5', title: 'Confirm Pickup', description: 'Driver confirms pickup. Status → "In Transit". GPS tracking activated (60-sec interval). Recipient notified with tracking link.', actor: 'Driver' },
      { id: '5.6', title: 'Sender No-Show', description: 'Exception: Sender not available. SMS sent, 15-min wait. If no response: "Pickup Failed". 3 no-shows = account review.', actor: 'System' },
    ]
  },
  {
    id: 'delivery',
    title: 'Delivery & Confirmation',
    icon: 'checkmark-circle',
    color: '#DC2626',
    description: 'Triple-verification delivery: OTP + Photo + Optional Signature. 24-hour dispute window.',
    steps: [
      { id: '6.1', title: 'En Route Tracking', description: 'GPS tracking continues. Recipient notified at 15km ("arriving in ~X min") and 5km ("arriving in ~10 min") from destination.', actor: 'System' },
      { id: '6.2', title: 'Arrive at Delivery', description: 'Driver taps "I\'ve Arrived". GPS validates within 200m. System sends 6-digit OTP to recipient via push + SMS. Valid 10 minutes.', actor: 'Driver' },
      { id: '6.3', title: 'OTP Verification', description: 'Recipient verifies driver identity (photo in app). Provides 6-digit OTP verbally. Driver enters OTP. 3 attempts allowed.', actor: 'Both' },
      { id: '6.4', title: 'Delivery Photo', description: 'Driver photographs parcel at delivery location (parcel + building visible). Auto-tagged with GPS + timestamp. Primary dispute evidence.', actor: 'Driver' },
      { id: '6.5', title: 'Confirm Delivery', description: 'Optional digital signature. Status → "Delivered". 24-hour dispute window starts. Driver earnings shown as pending.', actor: 'Driver' },
      { id: '6.6', title: 'Recipient Unavailable', description: 'Exception: 3-attempt system. Attempt 1: free retry. Attempt 2: sender chooses action. Attempt 3: return to sender.', actor: 'System' },
      { id: '6.7', title: 'Parcel Refused', description: 'Exception: Recipient refuses. Reason captured + photos. Damaged = insurance claim. Wrong item = admin correction. Changed mind = return fee.', actor: 'System' },
    ]
  },
  {
    id: 'payment',
    title: 'Payment & Settlement',
    icon: 'card',
    color: '#7C3AED',
    description: 'Secure escrow model: funds captured at booking, held during delivery, released after 24hr dispute window',
    steps: [
      { id: '7.1', title: 'Select Payment', description: 'Choose from saved methods (iPay, genie, PayHere, Sampath, cards). Biometric confirmation. PCI-DSS Level 1 compliant.', actor: 'Sender' },
      { id: '7.2', title: 'Pay Securely', description: 'View price breakdown: base fee + insurance (LKR 35) + service fee. Payment pre-authorised and placed in escrow.', actor: 'Sender' },
      { id: '7.3', title: 'Escrow Hold', description: 'Funds held securely. Neither ROUTELY nor driver can access. Daily reconciliation. Visible in sender\'s payment history.', actor: 'System' },
      { id: '7.4', title: 'Dispute Window', description: '24-hour window after delivery. Sender can raise dispute (escrow frozen, admin decision within 48hrs). No dispute = auto-release.', actor: 'System' },
      { id: '7.5', title: 'Escrow Release', description: 'Net payout calculated: total - platform commission (20% directional / LKR 25 courier) - gateway fee (~1.5%). Bank transfer initiated.', actor: 'System' },
      { id: '7.6', title: 'Driver Earnings', description: 'Driver dashboard: today\'s earnings, pending, released, monthly total, lifetime total. Weekly summary + CSV export for tax.', actor: 'Driver' },
      { id: '7.7', title: 'Courier Settlement', description: 'Courier companies: LKR 25 integration fee per booking. Monthly invoices auto-generated. Settlement reports emailed.', actor: 'System' },
      { id: '7.8', title: 'Cancellation Refund', description: '>24hrs = 100% refund. 12-24hrs = 90%. <12hrs = 70%. After QR scan = non-refundable. Refund to original payment method.', actor: 'System' },
    ]
  },
  {
    id: 'rating',
    title: 'Rating & Feedback',
    icon: 'star',
    color: '#F59E0B',
    description: 'Triple-rating system: Sender, Recipient, and Driver all rate each other. Feeds recommendation algorithm.',
    steps: [
      { id: '8.1', title: 'Rating Request', description: 'All three parties receive rating prompt via push notification + in-app banner after delivery confirmation. 72-hour window.', actor: 'System' },
      { id: '8.2', title: 'Sender Rates', description: 'Rate 1-5 stars: driver professionalism + parcel condition. Low ratings (1-2) require mandatory reason selection + free text.', actor: 'Sender' },
      { id: '8.3', title: 'Recipient Rates', description: 'Rate: parcel condition (weighted higher), driver professionalism, on-time delivery. Condition rating triggers damage investigation if needed.', actor: 'Recipient' },
      { id: '8.4', title: 'Driver Rates Sender', description: 'Rate sender: parcel readiness, accuracy vs listing, communication. Low sender ratings reduce their future match priority.', actor: 'Driver' },
      { id: '8.5', title: 'Score Processing', description: 'Composite score = (30-day weighted avg × 0.7) + (new rating × 0.3). Route-specific scores updated. Threshold alerts triggered.', actor: 'System' },
      { id: '8.6', title: 'Intelligence Engine', description: 'Performance Intelligence Engine retrains weekly: route reliability, driver scores per corridor, sender behaviour. Key competitive moat.', actor: 'System' },
      { id: '8.7', title: 'Quality Review', description: 'Admin reviews: all 1-2 star ratings, disputed deliveries, patterns. Actions: coaching, warning, suspension, ban.', actor: 'Admin' },
    ]
  },
];

export const FLOW_CONNECTIONS = {
  onboarding: ['courier', 'directional', 'driver'],
  courier: ['pickup', 'payment'],
  directional: ['driver', 'pickup', 'payment'],
  driver: ['pickup'],
  pickup: ['delivery'],
  delivery: ['payment', 'rating'],
  payment: ['rating'],
  rating: [],
};
