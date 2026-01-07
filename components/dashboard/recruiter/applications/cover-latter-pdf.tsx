"use client";
import { ExternalLink, FileText } from 'lucide-react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import React from 'react';



import { PDFDownloadLink } from "@react-pdf/renderer";

const CoverLatterPdf = ({imageUrl,name,email,phone,jobTitle,coverLetter}: {imageUrl:string,name:string,email:string,phone:string,jobTitle:string,coverLetter:string}) => {

  const data = {
    name,
    email,
    phone,
    jobTitle,
    coverLetter,
    imageUrl,
  };

  return (
    <PDFDownloadLink
      document={<PDF {...data} />}
      fileName="Cover-Letter.pdf"
      className="w-full"
    >
      {({ loading }) => (
        <div className="border border-neutral-300 p-3 rounded-lg flex items-center w-full cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="rounded-md p-3 bg-violet-100">
              <FileText size={13} className="text-violet-500" />
            </div>

            <div>
              <p className="text-lg font-semibold tracking-tight">
                {loading ? "Generating PDF..." : "Cover Letter.pdf"}
              </p>
              <p className="text-sm font-medium text-neutral-500">
                PDF Document
              </p>
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            <ExternalLink size={13} />
          </div>
        </div>
      )}
    </PDFDownloadLink>
  );
};

export default CoverLatterPdf;



const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  container: {
    border: "2 solid #000",
    padding: 20,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    border: "1 solid #000",
  },
  info: {
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold",
  },
  sectionTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#b3e5ff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

type Props = {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  coverLetter: string;
  imageUrl: string;
};

const PDF = ({
  name,
  email,
  phone,
  jobTitle,
  coverLetter,
  imageUrl,
}: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image src={imageUrl} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{name}</Text>
              <Text>{email}</Text>
              <Text>{phone}</Text>
            </View>
          </View>

          <Text style={styles.jobTitle}>{jobTitle}</Text>

          <Text style={styles.sectionTitle}>Cover Letter</Text>
          <Text>{coverLetter}</Text>

          <View style={styles.footer}>
            <Text>SmartJobAI</Text>
            <Text>smartjobai@gmail.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
