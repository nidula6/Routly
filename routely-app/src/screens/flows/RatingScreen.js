import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';

const RatingScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [driverRating, setDriverRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const renderStars = (rating, onRate) => (
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onRate(star)}>
          <Ionicons
            name={star <= rating ? 'star' : 'star-outline'}
            size={36}
            color={star <= rating ? COLORS.accent : COLORS.gray300}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStep = () => {
    switch (step) {
      case 1: return renderRatingPrompt();
      case 2: return renderDriverRatingStep();
      case 3: return renderServiceFeedback();
      case 4: return renderIntelligenceEngine();
      case 5: return renderThankYou();
      default: return null;
    }
  };

  const renderRatingPrompt = () => (
    <View>
      <Text style={styles.stepTitle}>⭐ Rate Your Experience</Text>
      <Text style={styles.stepDesc}>Step 8.1 — Triple rating system for comprehensive feedback</Text>

      <View style={styles.explainCard}>
        <Ionicons name="star-half" size={48} color={COLORS.accent} />
        <Text style={styles.explainTitle}>Your Feedback Matters</Text>
        <Text style={styles.explainText}>ROUTELY uses a triple rating system to ensure quality service for everyone.</Text>
      </View>

      <Text style={styles.sectionLabel}>Three Rating Layers</Text>

      {[
        { icon: 'car', title: 'Rate the Driver', desc: 'Punctuality, care with parcel, professionalism', color: COLORS.primary },
        { icon: 'cube', title: 'Rate Delivery Quality', desc: 'Parcel condition, speed, communication', color: COLORS.secondary },
        { icon: 'phone-portrait', title: 'Rate the Platform', desc: 'App experience, accuracy, value for money', color: COLORS.info },
      ].map((item, i) => (
        <View key={i} style={styles.ratingLayer}>
          <View style={[styles.layerIcon, { backgroundColor: item.color + '15' }]}>
            <Ionicons name={item.icon} size={24} color={item.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.layerTitle}>{item.title}</Text>
            <Text style={styles.layerDesc}>{item.desc}</Text>
          </View>
        </View>
      ))}

      <View style={styles.whoRates}>
        <Text style={styles.whoRatesTitle}>Who Rates Whom?</Text>
        <View style={styles.rateArrow}><Text style={styles.rateText}>📦 Sender → rates Driver & Platform</Text></View>
        <View style={styles.rateArrow}><Text style={styles.rateText}>🏠 Recipient → rates Driver & Delivery</Text></View>
        <View style={styles.rateArrow}><Text style={styles.rateText}>🚗 Driver → rates Sender & Platform</Text></View>
      </View>

      <Button title="Start Rating" onPress={() => setStep(2)} style={{ backgroundColor: COLORS.accent }} />
    </View>
  );

  const renderDriverRatingStep = () => (
    <View>
      <Text style={styles.stepTitle}>🚗 Rate Your Driver</Text>
      <Text style={styles.stepDesc}>Step 8.2 — How was your experience with the driver?</Text>

      <View style={styles.driverCard}>
        <Ionicons name="person-circle" size={56} color={COLORS.primary} />
        <Text style={styles.driverName}>Nuwan Jayawardena</Text>
        <Text style={styles.driverVehicle}>Toyota Aqua — WP CAD-5678</Text>
        <Text style={styles.driverInfo}>NIC Verified • 4.8★ • 234 deliveries</Text>
      </View>

      <Text style={styles.rateQuestion}>Overall Driver Rating</Text>
      {renderStars(driverRating, setDriverRating)}
      {driverRating > 0 && (
        <Text style={styles.ratingLabel}>
          {['', 'Poor', 'Below Average', 'Good', 'Very Good', 'Excellent'][driverRating]}
        </Text>
      )}

      <Text style={styles.tagsTitle}>Quick Feedback Tags</Text>
      <View style={styles.tagsContainer}>
        {['On Time', 'Careful Handling', 'Friendly', 'Professional', 'Great Communication', 'Fast Delivery', 'Clean Vehicle', 'Late', 'Rude', 'Rough Handling'].map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[styles.tag, selectedTags.includes(tag) && styles.tagSelected,
              ['Late', 'Rude', 'Rough Handling'].includes(tag) && selectedTags.includes(tag) && styles.tagNegative
            ]}
            onPress={() => toggleTag(tag)}
          >
            <Text style={[styles.tagText, selectedTags.includes(tag) && styles.tagTextSelected,
              ['Late', 'Rude', 'Rough Handling'].includes(tag) && selectedTags.includes(tag) && styles.tagTextNegative
            ]}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Next: Service Rating" onPress={() => setStep(3)} disabled={driverRating === 0} style={{ marginTop: 16, backgroundColor: COLORS.primary }} />
    </View>
  );

  const renderServiceFeedback = () => (
    <View>
      <Text style={styles.stepTitle}>📊 Service Quality</Text>
      <Text style={styles.stepDesc}>Step 8.3 — Rate the overall delivery experience</Text>

      <Text style={styles.rateQuestion}>Delivery Experience</Text>
      {renderStars(serviceRating, setServiceRating)}
      {serviceRating > 0 && (
        <Text style={styles.ratingLabel}>
          {['', 'Poor', 'Below Average', 'Good', 'Very Good', 'Excellent'][serviceRating]}
        </Text>
      )}

      <View style={styles.feedbackAreas}>
        <Text style={styles.feedbackTitle}>Rate Specific Areas</Text>

        {[
          { name: 'Parcel Condition', icon: 'cube' },
          { name: 'Delivery Speed', icon: 'flash' },
          { name: 'Communication', icon: 'chatbox' },
          { name: 'Value for Money', icon: 'pricetag' },
          { name: 'App Experience', icon: 'phone-portrait' },
        ].map((area, i) => (
          <View key={i} style={styles.areaRow}>
            <View style={styles.areaLeft}>
              <Ionicons name={area.icon} size={18} color={COLORS.gray500} />
              <Text style={styles.areaName}>{area.name}</Text>
            </View>
            <View style={styles.miniStars}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Ionicons key={s} name={s <= 4 ? 'star' : 'star-outline'} size={18} color={s <= 4 ? COLORS.accent : COLORS.gray300} />
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.commentBox}>
        <Text style={styles.commentLabel}>Additional Comments (Optional)</Text>
        <View style={styles.commentInput}>
          <Text style={styles.commentPlaceholder}>Share any additional feedback about your experience...</Text>
        </View>
      </View>

      <Button title="Submit Rating" onPress={() => setStep(4)} disabled={serviceRating === 0} style={{ backgroundColor: COLORS.secondary }} />
    </View>
  );

  const renderIntelligenceEngine = () => (
    <View>
      <Text style={styles.stepTitle}>🧠 Rating Intelligence</Text>
      <Text style={styles.stepDesc}>Step 8.4–8.5 — How ROUTELY uses your feedback</Text>

      <View style={styles.engineCard}>
        <Ionicons name="analytics" size={48} color={COLORS.primary} />
        <Text style={styles.engineTitle}>Smart Rating Processing</Text>
        <Text style={styles.engineText}>Your ratings feed into ROUTELY's intelligence engine to improve service quality for everyone.</Text>
      </View>

      <Text style={styles.sectionLabel}>Rating Impact</Text>

      {[
        { icon: 'trending-up', title: 'Driver Quality Score', desc: 'Weighted average across all deliveries. Affects driver visibility and booking priority.', color: COLORS.primary },
        { icon: 'shield-checkmark', title: 'Trust Score', desc: 'Combined metric: ratings + verification status + delivery success rate + dispute history.', color: COLORS.secondary },
        { icon: 'pulse', title: 'Performance Alerts', desc: 'Drivers below 3.5★ receive improvement notices. Below 3.0★ triggers review.', color: COLORS.accent },
        { icon: 'trophy', title: 'Top Driver Rewards', desc: 'Drivers above 4.5★ earn "Top Driver" badge and priority in directional matching.', color: COLORS.info },
      ].map((item, i) => (
        <View key={i} style={styles.impactCard}>
          <View style={[styles.impactIcon, { backgroundColor: item.color + '15' }]}>
            <Ionicons name={item.icon} size={22} color={item.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.impactTitle}>{item.title}</Text>
            <Text style={styles.impactDesc}>{item.desc}</Text>
          </View>
        </View>
      ))}

      <View style={styles.antiManip}>
        <Ionicons name="lock-closed" size={16} color={COLORS.danger} />
        <View>
          <Text style={styles.antiManipTitle}>Anti-Manipulation Safeguards</Text>
          <Text style={styles.antiManipText}>• Only verified deliveries can be rated{'\n'}• Anomalous patterns (all 1★ or 5★ spikes) flagged{'\n'}• Ratings locked after 72 hours{'\n'}• Platform reviews disputed ratings manually</Text>
        </View>
      </View>

      <Button title="See Thank You" onPress={() => setStep(5)} style={{ backgroundColor: COLORS.primary }} />
    </View>
  );

  const renderThankYou = () => (
    <View style={styles.thankContainer}>
      <Ionicons name="heart" size={80} color={COLORS.danger} />
      <Text style={styles.thankTitle}>Thank You!</Text>
      <Text style={styles.thankDesc}>Your feedback helps improve ROUTELY for everyone in Sri Lanka.</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Rating Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Driver Rating</Text>
          <View style={styles.summaryStars}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons key={s} name={s <= driverRating ? 'star' : 'star-outline'} size={16} color={s <= driverRating ? COLORS.accent : COLORS.gray300} />
            ))}
          </View>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service Rating</Text>
          <View style={styles.summaryStars}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons key={s} name={s <= serviceRating ? 'star' : 'star-outline'} size={16} color={s <= serviceRating ? COLORS.accent : COLORS.gray300} />
            ))}
          </View>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tags Selected</Text>
          <Text style={styles.summaryValue}>{selectedTags.length} tags</Text>
        </View>
      </View>

      <View style={styles.rewardNote}>
        <Ionicons name="gift" size={20} color={COLORS.secondary} />
        <Text style={styles.rewardText}>You earned 5 loyalty points for leaving a detailed review!</Text>
      </View>

      <Button title="Back to Dashboard" onPress={() => navigation.navigate('SenderDashboard')} style={{ backgroundColor: COLORS.primary }} />
      <Button title="View Process Flows" onPress={() => navigation.navigate('ProcessFlow')} variant="outline" style={{ marginTop: 8, borderColor: COLORS.primary }} textStyle={{ color: COLORS.primary }} />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rating & Feedback</Text>
        <View style={[styles.stepBadge, { backgroundColor: COLORS.accentBg }]}>
          <Text style={[styles.stepBadgeText, { color: COLORS.accentDark }]}>{step}/5</Text>
        </View>
      </View>
      <View style={styles.progressOuter}>
        <View style={[styles.progressInner, { width: `${(step / 5) * 100}%`, backgroundColor: COLORS.accent }]} />
      </View>
      <View style={styles.content}>{renderStep()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 60, paddingHorizontal: SIZES.padding, paddingBottom: 12, backgroundColor: COLORS.white,
  },
  headerTitle: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.semiBold },
  stepBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  stepBadgeText: { fontSize: SIZES.sm, ...FONTS.bold },
  progressOuter: { height: 3, backgroundColor: COLORS.gray200 },
  progressInner: { height: '100%', borderRadius: 2 },
  content: { padding: SIZES.padding, paddingBottom: 40 },
  stepTitle: { fontSize: SIZES.xl, color: COLORS.dark, ...FONTS.bold, marginBottom: 4 },
  stepDesc: { fontSize: SIZES.sm, color: COLORS.gray500, marginBottom: 24, ...FONTS.medium },
  sectionLabel: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 12 },
  explainCard: {
    backgroundColor: COLORS.accentBg, borderRadius: SIZES.radius, padding: 24,
    alignItems: 'center', marginBottom: 24,
  },
  explainTitle: { fontSize: SIZES.lg, color: COLORS.accentDark, ...FONTS.bold, marginTop: 8 },
  explainText: { fontSize: SIZES.sm, color: COLORS.gray600, textAlign: 'center', marginTop: 6 },
  ratingLayer: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.white, borderRadius: SIZES.radiusSm, padding: 14,
    marginBottom: 8, ...SHADOWS.sm,
  },
  layerIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  layerTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  layerDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  whoRates: {
    backgroundColor: COLORS.gray50, padding: 14, borderRadius: SIZES.radiusSm, marginTop: 8, marginBottom: 20,
  },
  whoRatesTitle: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 8 },
  rateArrow: { marginBottom: 4 },
  rateText: { fontSize: SIZES.sm, color: COLORS.gray600 },
  driverCard: {
    alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radius,
    padding: 20, marginBottom: 24, ...SHADOWS.md,
  },
  driverName: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.bold, marginTop: 8 },
  driverVehicle: { fontSize: SIZES.sm, color: COLORS.gray600, marginTop: 4 },
  driverInfo: { fontSize: SIZES.xs, color: COLORS.secondary, marginTop: 4, ...FONTS.medium },
  rateQuestion: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, textAlign: 'center', marginBottom: 12 },
  stars: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 8 },
  ratingLabel: { textAlign: 'center', fontSize: SIZES.md, color: COLORS.accent, ...FONTS.semiBold, marginBottom: 20 },
  tagsTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 10 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: COLORS.gray300, backgroundColor: COLORS.white,
  },
  tagSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryBg },
  tagNegative: { borderColor: COLORS.danger, backgroundColor: COLORS.dangerBg },
  tagText: { fontSize: SIZES.sm, color: COLORS.gray600 },
  tagTextSelected: { color: COLORS.primary, ...FONTS.medium },
  tagTextNegative: { color: COLORS.danger, ...FONTS.medium },
  feedbackAreas: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginTop: 16, marginBottom: 16, ...SHADOWS.sm,
  },
  feedbackTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 12 },
  areaRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  areaLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  areaName: { fontSize: SIZES.sm, color: COLORS.gray600 },
  miniStars: { flexDirection: 'row', gap: 2 },
  commentBox: { marginBottom: 20 },
  commentLabel: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium, marginBottom: 8 },
  commentInput: {
    backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray300,
    borderRadius: SIZES.radiusSm, padding: 14, minHeight: 80,
  },
  commentPlaceholder: { color: COLORS.gray400, fontSize: SIZES.sm },
  engineCard: {
    backgroundColor: COLORS.primaryBg, borderRadius: SIZES.radius, padding: 24,
    alignItems: 'center', marginBottom: 24,
  },
  engineTitle: { fontSize: SIZES.lg, color: COLORS.primary, ...FONTS.bold, marginTop: 8 },
  engineText: { fontSize: SIZES.sm, color: COLORS.gray600, textAlign: 'center', marginTop: 6 },
  impactCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    marginBottom: 14,
  },
  impactIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  impactTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  impactDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  antiManip: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: COLORS.dangerBg, padding: 14, borderRadius: SIZES.radiusSm, marginTop: 8, marginBottom: 20,
    borderLeftWidth: 4, borderLeftColor: COLORS.danger,
  },
  antiManipTitle: { fontSize: SIZES.sm, color: COLORS.danger, ...FONTS.semiBold },
  antiManipText: { fontSize: SIZES.xs, color: COLORS.gray600, marginTop: 4, lineHeight: 18 },
  thankContainer: { alignItems: 'center' },
  thankTitle: { fontSize: 32, color: COLORS.dark, ...FONTS.bold, marginTop: 12 },
  thankDesc: { fontSize: SIZES.md, color: COLORS.gray600, textAlign: 'center', marginTop: 8, marginBottom: 24 },
  summaryCard: {
    width: '100%', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginBottom: 16, ...SHADOWS.sm,
  },
  summaryTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 12 },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  summaryLabel: { fontSize: SIZES.sm, color: COLORS.gray600 },
  summaryStars: { flexDirection: 'row', gap: 2 },
  summaryValue: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  rewardNote: {
    flexDirection: 'row', alignItems: 'center', gap: 8, width: '100%',
    backgroundColor: COLORS.secondaryBg, padding: 14, borderRadius: SIZES.radius, marginBottom: 20,
  },
  rewardText: { flex: 1, fontSize: SIZES.sm, color: COLORS.secondaryDark, ...FONTS.medium },
});

export default RatingScreen;
