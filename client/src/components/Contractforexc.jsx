import { PDFViewer, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import React from 'react'


const Contractforexc = ({ text }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page style={styles.page}>
          <Text style={styles.heading}>Contract</Text>
          <Text style={styles.content}>{text}</Text>
          {/* <Text style={styles.signature}>________________________</Text> */}
          <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: 12,
    paddingTop: 30,
    paddingHorizontal: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  content: {
    marginBottom: 20,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  signature: {
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'right',
  },
  date: {
    textAlign: 'right',
  },
});

export default Contractforexc;