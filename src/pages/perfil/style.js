import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F7FA" },
  loadingArea: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollContent: { paddingBottom: 40 },

  // HERO PROFILE
  hero: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  avatarContainer: { position: "relative", marginBottom: 15 },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#0d214f",
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#0d214f",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: { color: "#FFF", fontSize: 40, fontWeight: "bold" },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#27AE60",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  editIcon: { fontSize: 14 },
  heroName: { fontSize: 22, fontWeight: "bold", color: "#2C3E50" },
  heroEmail: { fontSize: 14, color: "#7F8C8D" },

  // TABS
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#E8EEF2",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center", borderRadius: 10 },
  activeTab: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: { fontSize: 14, fontWeight: "600", color: "#95A5A6" },
  activeTabText: { color: "#0d214f", fontWeight: "bold" },
  tabContent: { paddingHorizontal: 20 },

  // FORMS
  formGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: "700", color: "#34495E", marginBottom: 8 },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E6ED",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#2C3E50",
  },
  divider: { height: 1, backgroundColor: "#E0E6ED", marginVertical: 20 },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#0d214f",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },

  // PRONTUÁRIO CARDS
  medicalIdCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  medicalIdHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
    paddingBottom: 15,
    marginBottom: 15,
  },
  medicalIdLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  medicalIdValue: { color: "#FFF", fontSize: 32, fontWeight: "900" },
  medicalIdRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 40,
  },
  medicalIdSubValue: { color: "#FFF", fontSize: 20, fontWeight: "bold" },

  sectionCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2C3E50",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F5",
  },
  listItemTitle: { fontSize: 15, color: "#34495E", fontWeight: "500" },
  listItemBadge: { fontSize: 13, fontWeight: "bold" },
  listItemSub: { fontSize: 13, color: "#95A5A6" },
  emptyText: { color: "#95A5A6", fontStyle: "italic", marginTop: 5 },

  pdfButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#34495E",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  pdfButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});

export default styles;
