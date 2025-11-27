import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#F5F7FA" 
  },
  
  loadingArea: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#F5F7FA"
  },
  
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#0d214f",
    fontWeight: "600"
  },
  
  scrollContent: { 
    paddingBottom: 40 
  },

  // ═══════════════════════════════════════════════════════
  // HERO PROFILE - ULTRA PREMIUM
  // ═══════════════════════════════════════════════════════
  hero: {
    position: "relative",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: "#0d214f",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 25,
    overflow: "hidden",
  },

  heroBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
  },

  floatingCircle1: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#3498db",
  },

  floatingCircle2: {
    position: "absolute",
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#0d214f",
  },

  avatarContainer: { 
    position: "relative", 
    marginBottom: 20,
    shadowColor: "#0d214f",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
  },
  
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 5,
    borderColor: "#FFF",
  },
  
  avatarPlaceholder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#FFF",
  },
  
  avatarInitials: { 
    color: "#FFF", 
    fontSize: 48, 
    fontWeight: "900",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  
  editIconContainer: {
    position: "absolute",
    bottom: 2,
    right: 2,
    shadowColor: "#27ae60",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },

  editIconGradient: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FFF",
  },
  
  heroName: { 
    fontSize: 26, 
    fontWeight: "900", 
    color: "#0d214f",
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  heroEmailContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  
  heroEmail: { 
    fontSize: 14, 
    color: "#7F8C8D",
    marginLeft: 6,
    fontWeight: "500",
  },

  // ═══════════════════════════════════════════════════════
  // TABS - GLASSMORPHISM
  // ═══════════════════════════════════════════════════════
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  
  tab: { 
    flex: 1, 
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14, 
    borderRadius: 16,
    gap: 8,
  },
  
  activeTab: {
    backgroundColor: "#0d214f",
    shadowColor: "#0d214f",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  
  tabText: { 
    fontSize: 13, 
    fontWeight: "700", 
    color: "#95A5A6",
    letterSpacing: 0.5,
  },
  
  activeTabText: { 
    color: "#FFF", 
    fontWeight: "900",
  },
  
  tabContent: { 
    paddingHorizontal: 20 
  },

  // ═══════════════════════════════════════════════════════
  // FORMS - NEUMORPHISM STYLE
  // ═══════════════════════════════════════════════════════
  formCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 5,
  },

  formGroup: { 
    marginBottom: 20 
  },
  
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },

  label: { 
    fontSize: 14, 
    fontWeight: "800", 
    color: "#2C3E50",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderWidth: 2,
    borderColor: "#e9ecef",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },

  inputDisabled: {
    backgroundColor: "#f1f3f5",
    borderColor: "#dee2e6",
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#2C3E50",
    paddingVertical: 12,
    fontWeight: "500",
  },
  
  divider: { 
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
    paddingHorizontal: 20,
  },

  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#e9ecef",
  },

  dividerText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#95a5a6",
    marginHorizontal: 15,
    letterSpacing: 1.5,
  },

  passwordStrength: {
    marginTop: 15,
  },

  strengthBar: {
    height: 6,
    backgroundColor: "#e9ecef",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
  },

  strengthFill: {
    height: "100%",
    borderRadius: 10,
  },

  strengthText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7f8c8d",
    textAlign: "right",
  },
  
  saveButton: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#0d214f",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginTop: 10,
  },

  saveButtonGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    gap: 10,
  },
  
  saveButtonText: { 
    color: "#FFF", 
    fontSize: 17, 
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  // ═══════════════════════════════════════════════════════
  // PRONTUÁRIO CARDS - ULTRA DESIGN
  // ═══════════════════════════════════════════════════════
  medicalIdCard: {
    borderRadius: 28,
    padding: 24,
    marginBottom: 25,
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    overflow: "hidden",
    position: "relative",
  },
  
  medicalIdHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255,255,255,0.3)",
    paddingBottom: 18,
    marginBottom: 18,
  },
  
  medicalIdLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  
  medicalIdValue: { 
    color: "#FFF", 
    fontSize: 36, 
    fontWeight: "900",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  
  medicalIdRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },

  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },
  
  medicalIdSubValue: { 
    color: "#FFF", 
    fontSize: 22, 
    fontWeight: "900",
    marginTop: 8,
  },

  hexPattern: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },

  hexagon: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    transform: [{ rotate: "45deg" }],
  },

  sectionCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 5,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 10,
  },
  
  sectionTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#2C3E50",
    letterSpacing: 0.5,
  },
  
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f5",
  },

  listItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },

  severityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  vaccineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#27ae60",
  },
  
  listItemTitle: { 
    fontSize: 15, 
    color: "#2C3E50", 
    fontWeight: "700",
  },

  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  severityText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  
  listItemSub: { 
    fontSize: 13, 
    color: "#95A5A6",
    fontWeight: "500",
    marginTop: 2,
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 30,
  },
  
  emptyText: { 
    color: "#95A5A6", 
    fontStyle: "italic", 
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
  },

  pdfButton: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#3498db",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginTop: 15,
  },

  pdfButtonGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    gap: 10,
  },
  
  pdfButtonText: { 
    color: "#FFF", 
    fontWeight: "900", 
    fontSize: 16,
    letterSpacing: 0.5,
  },

  // ═══════════════════════════════════════════════════════
  // CARTÃO SUS DIGITAL - DESIGN ÉPICO
  // ═══════════════════════════════════════════════════════
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },

  closeModal: {
    position: "absolute",
    top: -50,
    right: 10,
    zIndex: 999,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFF",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.5,
  },

  modalSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 30,
    fontWeight: "500",
  },

  susCard: {
    width: width - 10,
    height: (width - 0) * 0.67,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 20,
  },

  susCardBack: {
    position: "absolute",
    backfaceVisibility: "hidden",
  },

  susCardGradient: {
    flex: 1,
    padding: 20,
  },

  susCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },

  susLogo: {
    width: 50,
    height: 50,
    tintColor: "#FFF",
  },

  susCardTitle: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 1.2,
    flex: 1,
  },

  susCardBody: {
    flexDirection: "row",
    flex: 1,
    gap: 15,
  },

  susAvatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 45,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  susAvatar: {
    width: "100%",
    height: "100%",
  },

  susAvatarPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  susAvatarInitials: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFF",
  },

  susInfo: {
    flex: 1,
    justifyContent: "center",
  },

  susLabel: {
    fontSize: 9,
    fontWeight: "900",
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 1,
    marginBottom: 4,
  },

  susValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 0.5,
  },

  susNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 2,
    fontFamily: "monospace",
  },

  susCardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    gap: 8,
  },

  susFooterText: {
    fontSize: 11,
    fontWeight: "800",
    color: "rgba(255,255,255,0.9)",
    letterSpacing: 1,
  },

  chipDecoration: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 50,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  chipLines: {
    width: 30,
    height: 25,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
  },

  // VERSO DO CARTÃO SUS
  susBackStripe: {
    height: 50,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 20,
  },

  susBackContent: {
    flex: 1,
  },

  susBackTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 1.5,
    marginBottom: 20,
    textAlign: "center",
  },

  medicalInfo: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    backdropFilter: "blur(10px)",
  },

  medicalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },

  medicalLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(255,255,255,0.8)",
    flex: 1,
  },

  medicalValue: {
    fontSize: 13,
    fontWeight: "900",
    color: "#FFF",
    flex: 1.5,
  },

  qrCodePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    borderStyle: "dashed",
  },

  qrText: {
    fontSize: 10,
    fontWeight: "900",
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 2,
    marginTop: 8,
  },

  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#27ae60",
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 25,
    marginTop: 30,
    gap: 10,
    shadowColor: "#27ae60",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },

  downloadButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 0.5,
  },
});

export default styles;