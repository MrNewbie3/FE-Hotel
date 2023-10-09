"use client";
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, Svg, Path } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  invoice: {
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 8,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  headerText: {
    flex: 1,
  },
  headerMainText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubText: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    position: "relative",
    marginTop: 20,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
});
export const Invoice = (data: any) => {
  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.invoice}>
            <View style={styles.header}>
              <Image src="/images/logo.png" style={styles.logo} />
              <View style={styles.headerText}>
                <Text style={styles.headerMainText}>Your Hotel Name</Text>
                <Text style={styles.headerSubText}>123 Main Street, Cityville, Country</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hotel Information</Text>
              <Text style={styles.sectionText}>Hotel Name: Arth Hotel</Text>
              <Text style={styles.sectionText}>Address: 123 Main Street</Text>
              <Text style={styles.sectionText}>Room Number: {data.data.nomor}</Text>
              {/* Add more hotel information as needed */}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reservation Information</Text>
              <Text style={styles.sectionText}>Reservation ID: {data.data.id}</Text>
              <Text style={styles.sectionText}>Check-in Date: {data.data.tgl_check_in}</Text>
              <Text style={styles.sectionText}>Check-out Date: {data.data.tgl_check_out}</Text>
              <Text style={styles.sectionText}>Order Date: {data.data.tgl_pemesanan}</Text>
              {/* Add more reservation information as needed */}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>User Information</Text>
              <Text style={styles.sectionText}>Name: {data.data.nama_tamu}</Text>
              <Text style={styles.sectionText}>Email: {data.data.email_pemesan}</Text>
              {/* Add more user information as needed */}
            </View>
            <View style={styles.footer}>
              <Svg height="50" width="100%">
                <Path d="M0,0 L100,0 L50,50 Z" fill="#007BFF" />
              </Svg>
              <Text style={styles.footerText}>Contact us at: info@yourhotel.com</Text>
              <Text style={styles.footerText}>Phone: +123-456-7890</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
