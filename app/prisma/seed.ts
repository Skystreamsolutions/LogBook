import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const taskTypes = [
  { code: "TBSH", name: "Troubleshooting" },
  { code: "CRS", name: "Certificate of Release to Service" },
  { code: "MOD", name: "Modification" },
  { code: "SPC", name: "Special Check" },
  { code: "OPC", name: "Operational Check" },
  { code: "GVI", name: "General Visual Inspection" },
  { code: "SUP", name: "Supervision" },
  { code: "REM", name: "Removal" },
  { code: "INS", name: "Installation" },
  { code: "SER", name: "Servicing" },
  { code: "REP", name: "Repair / Replacement" },
  { code: "FUC", name: "Functional Check" },
  { code: "DVI", name: "Detailed Visual Inspection" },
  { code: "IND", name: "Independent Inspection" },
  { code: "ADJ", name: "Adjustment" },
  { code: "DUP", name: "Duplicate Inspection" },
];

const licenceCategories = [
  { code: "B1.2", name: "B1.2 - Aeroplane Piston" },
  { code: "B1.3", name: "B1.3 - Helicopter Turbine" },
  { code: "B1.4", name: "B1.4 - Helicopter Piston" },
  { code: "B2", name: "B2 - Avionics" },
  { code: "B3", name: "B3 - Light Aircraft Maintenance" },
];

const aircraftData = [
  { registration: "OM-EAS", aircraftType: "Sikorsky 269/300", engine: "Lycoming" },
  { registration: "OM-STA", aircraftType: "Sikorsky 269/300", engine: "Lycoming" },
  { registration: "OM-ARM", aircraftType: "Sikorsky 269/300", engine: "Lycoming" },
  { registration: "OM-HCY", aircraftType: "Sikorsky 269/300", engine: "Lycoming" },
  { registration: "OM-ZMI", aircraftType: "Tomark Viper SD-4 RTC", engine: "Rotax" },
  { registration: "OM-KIT", aircraftType: "Cessna 150/F150", engine: "Continental" },
  { registration: "OM-FFL", aircraftType: "Tomark Viper SD4 RTC", engine: "Rotax" },
  { registration: "OM-LKJ", aircraftType: "Viper SD-4 (Rotax) RTC", engine: "Rotax" },
  { registration: "OM-BRE", aircraftType: "Tecnam P92", engine: "Rotax" },
  { registration: "OM-KAB", aircraftType: "Cessna 172/F172", engine: "Lycoming" },
  { registration: "OK-HSO", aircraftType: "MD Heli 369 (RR250)", engine: "RR250" },
  { registration: "OM-BHK", aircraftType: "UH-60A", engine: "GE-T700" },
  { registration: "OE-XMF", aircraftType: "Sikorsky 269/300", engine: "Lycoming" },
  { registration: "OE-XRN", aircraftType: "Sikorsky 269/300", engine: "Lycoming" },
  { registration: "OM-GGB", aircraftType: "Sikorsky 269/300", engine: "Lycoming" },
  { registration: "OM-CBS", aircraftType: "Viper SD-4", engine: "Rotax" },
  { registration: "OM-PAC", aircraftType: "Cessna 182/F182 Series", engine: "Continental" },
  { registration: "OK-EAI", aircraftType: "MD Heli 369 (RR250)", engine: "RR250" },
  { registration: "OK-PKS", aircraftType: "MD Heli 369 (RR250)", engine: "RR250" },
];

const logEntries = [
  { date: "2021-02-03", reg: "OM-EAS", ata: "5", taskType: "TBSH", desc: "Performed exchange longitudal trim servo", workType: "SHOP", licence: "B1.4", hours: 4.00, workorder: "01.02.21/O283" },
  { date: "2021-02-03", reg: "OM-EAS", ata: "5", taskType: "CRS", desc: "CRS after repair", workType: "SHOP", licence: "B1.4", hours: 1.00, workorder: "01.02.21/O283" },
  { date: "2021-02-17", reg: "OM-STA", ata: "5", taskType: "CRS", desc: "50H Inspection", workType: "SHOP", licence: "B1.4", hours: 6.00, workorder: "01.02.21/S1815" },
  { date: "2021-03-09", reg: "OM-ARM", ata: "5", taskType: "MOD", desc: "Performed exchange transponder. CS-STAN CS-SC002c. Form 123 No. 01.03.21/S1268", workType: "SHOP", licence: "B2", hours: 8.00, workorder: "01.03.21/S1268" },
  { date: "2021-03-09", reg: "OM-ARM", ata: "5", taskType: "SPC", desc: "Performed XPDR, ELT check.", workType: "SHOP", licence: "B2", hours: 4.00, workorder: "01.03.21/S1268" },
  { date: "2021-03-09", reg: "OM-ARM", ata: "5", taskType: "SPC", desc: "Magnetic compass compensation", workType: "SHOP", licence: "B2", hours: 3.00, workorder: "01.03.21/S1268" },
  { date: "2021-03-09", reg: "OM-ARM", ata: "5", taskType: "CRS", desc: "CRS", workType: "SHOP", licence: "B2", hours: 1.00, workorder: "01.03.21/S1268" },
  { date: "2021-03-10", reg: "OM-EAS", ata: "5", taskType: "TBSH", desc: "Performed exchange of longitude trim servo", workType: "SHOP", licence: "B1.4", hours: 4.00, workorder: "01.03.21/O283" },
  { date: "2021-03-10", reg: "OM-EAS", ata: "5", taskType: "CRS", desc: "CRS after repair.", workType: "SHOP", licence: "B1.4", hours: 1.00, workorder: "01.03.21/O283" },
  { date: "2021-03-11", reg: "OM-STA", ata: "5", taskType: "TBSH", desc: "Performed torque check of droop stop retaining nut.", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "01.03.21/S1815" },
  { date: "2021-03-11", reg: "OM-STA", ata: "5", taskType: "SER", desc: "Performed main rotor hub retention nut torque check.", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "01.03.21/S1815", verifiedBy: "SK.145.033" },
  { date: "2021-03-11", reg: "OM-STA", ata: "5", taskType: "CRS", desc: "CRS after performed work", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "01.03.21/S1815", verifiedBy: "SK.145.033" },
  { date: "2021-03-11", reg: "OM-STA", ata: "5", taskType: "REP", desc: "Performed exchange of fork assembly P/N 269A5664-3", workType: "SHOP", licence: "B1.4", hours: 3.00, workorder: "01.03.21/S1815", verifiedBy: "SK.145.033" },
  { date: "2021-03-11", reg: "OM-STA", ata: "5", taskType: "OPC", desc: "Performed tail rotor Track and Balance", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "01.03.21/S1812", verifiedBy: "SK.145.033" },
  { date: "2021-03-15", reg: "OM-ARM", ata: "5", taskType: "SUP", desc: "Performed 25 inspection of Airframe.", workType: "SHOP", licence: "B1.4", hours: 4.00, workorder: "02.03.21/S1268", verifiedBy: "SK.145.033" },
  { date: "2021-03-15", reg: "OM-ARM", ata: "5", taskType: "SUP", desc: "Performed exchange if oil filter snd oil on engine", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "02.03.21/S1268", verifiedBy: "SK.145.033" },
  { date: "2021-03-15", reg: "OM-ARM", ata: "2", taskType: "CRS", desc: "Performed realising to service after Inspection.", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "02.02.21/S1268", verifiedBy: "SK.145.033" },
  { date: "2021-03-15", reg: "OM-STA", ata: "5", taskType: "SUP", desc: "Performed 25 H Inspection.", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "02.03.21/S1815", verifiedBy: "SK.145.055" },
  { date: "2021-03-15", reg: "OM-STA", ata: "5", taskType: "CRS", desc: "Performed realising to service.", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "02.03.21/S1815", verifiedBy: "SK.145.033" },
  { date: "2021-03-15", reg: "OM-EAS", ata: "5", taskType: "SUP", desc: "Performed 25H Inspection of Airframe", workType: "SHOP", licence: "B1.4", hours: 3.00, workorder: "02.03.21/SO283", verifiedBy: "SK.145.033" },
  { date: "2021-03-15", reg: "OM-EAS", ata: "5", taskType: "REM", desc: "Releasing to service", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "02.03.21/O283", verifiedBy: "SK.145.033" },
  { date: "2021-03-18", reg: "OM-EAS", ata: "5", taskType: "REM", desc: "Performed 100 H. Performed Lycoming SB 480F, AD US 2015-19-07, AD US 2015-23-01", workType: "SHOP", licence: "B1.4", hours: 8.00, workorder: "03.03.21/O283", verifiedBy: "SK.145.033" },
  { date: "2021-03-18", reg: "OM-EAS", ata: "5", taskType: "INS", desc: "Releasing to service.", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "03.05.21/O283", verifiedBy: "SK.145.033" },
  { date: "2021-03-18", reg: "OM-STA", ata: "5", taskType: "SUP", desc: "Performed 50 H inspection. Performed Lycoming SB 480F.", workType: "SHOP", licence: "B1.4", hours: 6.00, workorder: "03.03.21/S1815", verifiedBy: "SK.145.033" },
  { date: "2021-03-18", reg: "OM-STA", ata: "5", taskType: "CRS", desc: "Releasing to service after inspection.", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "03.03.21/S1815", verifiedBy: "SK.145.033" },
  { date: "2021-03-24", reg: "OM-HCY", ata: "5", taskType: "GVI", desc: "Performed 200 H inspection airframe. Performed 100 H inspection engine. Performed exchange magneto P/N 4270. Performed AD US 2015-19-07, AD US 2015-23-01, Lycoming SB-480 F.", workType: "SHOP", licence: "B1.4", hours: 9.99, workorder: "03.03.21/0288", verifiedBy: "SK.145.033" },
  { date: "2021-03-24", reg: "OM-HCY", ata: "5", taskType: "CRS", desc: "Performed releasing to service", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "03.03.0288" },
  { date: "2021-04-12", reg: "OM-ARM", ata: "5", taskType: "GVI", desc: "Performed 100 Hr inspection Airframe", workType: "SHOP", licence: "B1.4", hours: 9.00, workorder: "02.04.21/S1268", verifiedBy: "SK.145.055" },
  { date: "2021-04-13", reg: "OM-ARM", ata: "5", taskType: "GVI", desc: "Performed 100 H Inspection Engine. SB 480F, AD 2015-25-01, AD US 2015-19-07", workType: "SHOP", licence: "B1.4", hours: 8.00, workorder: "02.04.21/S1268", verifiedBy: "SK.145.033" },
  { date: "2021-04-13", reg: "OM-ARM", ata: "5", taskType: "CRS", desc: "Releasing to service", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "02.04.21/S1268", verifiedBy: "SK.145.033" },
  { date: "2021-04-14", reg: "OM-HCY", ata: "5", taskType: "GVI", desc: "Performed 25 H inspection of Airframe", workType: "SHOP", licence: "B1.4", hours: 3.00, workorder: "03.04.21/0288", verifiedBy: "SK.145.033" },
  { date: "2021-04-14", reg: "OM-HCY", ata: "5", taskType: "CRS", desc: "Releasing to service after maintenance", workType: "SHOP", licence: "B1.4", hours: 2.00, workorder: "03.04.21/0288", verifiedBy: "SK.145.033" },
  { date: "2021-09-30", reg: "OM-ZMI", ata: "5", taskType: "GVI", desc: "Performed of 100 Hrs Engine Inspection", workType: "SHOP", licence: "B1.2", hours: 3.00, workorder: "08/2021/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2021-09-30", reg: "OM-ZMI", ata: "5", taskType: "GVI", desc: "Performed of 100 Hrs Airframe Inspection", workType: "SHOP", licence: "B1.2", hours: 5.00, workorder: "08/2021/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2021-09-30", reg: "OM-ZMI", ata: "5", taskType: "GVI", desc: "Performed of 100 Hrs Propeller Inspection", workType: "SHOP", licence: "B1.2", hours: 2.00, workorder: "08/2021/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "GVI", desc: "Performed 50/100/200 Hrs Airframe Inspection", workType: "SHOP", licence: "B1.2", hours: 8.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "GVI", desc: "Performed 50/100/200 Engine Inspection", workType: "SHOP", licence: "B1.2", hours: 6.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "REP", desc: "Performed replacement of Engine Oil Filter", workType: "SHOP", licence: "B1.2", hours: 1.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "SER", desc: "Performed servicing of Engine with Oil", workType: "SHOP", licence: "B1.2", hours: 1.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "FUC", desc: "Performed functional check of Fuel Quantity Indicating System", workType: "SHOP", licence: "B1.2", hours: 2.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "GVI", desc: "Performed of Annual Inspection", workType: "SHOP", licence: "B1.2", hours: 8.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "OPC", desc: "Performed operational check of NAV/COM and XPDR", workType: "SHOP", licence: "B2", hours: 3.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "OPC", desc: "Performed operational check of ELT", workType: "SHOP", licence: "B2", hours: 1.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "OPC", desc: "Performed Pitot-static and Altimeter Test", workType: "SHOP", licence: "B2", hours: 5.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "DVI", desc: "Performed of SID No.1 Inspection", workType: "SHOP", licence: "B1.2", hours: 2.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "DVI", desc: "Performed of SID No. 2 Inspection", workType: "SHOP", licence: "B1.2", hours: 2.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "DVI", desc: "Performed of SID No. 22 Inspection", workType: "SHOP", licence: "B1.2", hours: 2.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-08", reg: "OM-KIT", ata: "5", taskType: "DVI", desc: "Performed of SID No. 24 Inspection", workType: "SHOP", licence: "B1.2", hours: 3.00, workorder: "1/2021/KIT", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-14", reg: "OM-FFL", ata: "5", taskType: "GVI", desc: "Performed 100/200 Hrs Airframe inspection", workType: "SHOP", licence: "B1.2", hours: 6.00, workorder: "06/2021/FFL", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-14", reg: "OM-FFL", ata: "5", taskType: "GVI", desc: "Performed 100/200 Hrs Engine Inspection", workType: "SHOP", licence: "B1.2", hours: 3.00, workorder: "06/2021/FFL", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-14", reg: "OM-FFL", ata: "5", taskType: "GVI", desc: "Performed 100 Hrs Propeller Inspection", workType: "SHOP", licence: "B1.2", hours: 1.72, workorder: "06/2021/FFL", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-21", reg: "OM-LKJ", ata: "5", taskType: "GVI", desc: "Performed 100/200 Hrs Airframe inspection", workType: "SHOP", licence: "B1.2", hours: 6.00, workorder: "03/2021/LKJ", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-21", reg: "OM-LKJ", ata: "5", taskType: "GVI", desc: "Performed 100/200 Hrs Engine Inspection", workType: "SHOP", licence: "B1.2", hours: 6.00, workorder: "03/2021/LKJ", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-21", reg: "OM-LKJ", ata: "5", taskType: "GVI", desc: "Performed 100 Hrs Propeller Inspection", workType: "SHOP", licence: "B1.2", hours: 2.00, workorder: "03/2021/LKJ", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-21", reg: "OM-LKJ", ata: "5", taskType: "REP", desc: "Performed replacement of Engine Oil Filter", workType: "SHOP", licence: "B1.2", hours: 1.00, workorder: "03/2021/LKJ", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-21", reg: "OM-LKJ", ata: "5", taskType: "SER", desc: "Performed servicing of Engine Oil Shell Ultra 4T 10W/40gine With Oil", workType: "SHOP", licence: "B1.2", hours: 3.00, workorder: "03/2021/LKJ", verifiedBy: "SK.CAO.009" },
  { date: "2021-10-27", reg: "OM-BRE", ata: "5", taskType: "REP", desc: "Performed replacement of MLG Legs", workType: "SHOP", licence: "B1.2", hours: 8.00, workorder: "CAMO-2100285", verifiedBy: "SK.CAO.009" },
  { date: "2021-11-11", reg: "OM-ZMI", ata: "5", taskType: "GVI", desc: "Performed 100/200 Hrs Airframe inspection", workType: "SHOP", licence: "B1.2", hours: 6.00, workorder: "10/2021/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2021-11-11", reg: "OM-ZMI", ata: "5", taskType: "GVI", desc: "Performed 100 Hrs Propeller Inspection", workType: "SHOP", licence: "B1.2", hours: 2.00, workorder: "10/2021/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2021-11-11", reg: "OM-ZMI", ata: "5", taskType: "GVI", desc: "Performed 100/200/400 Inspection of Engine", workType: "SHOP", licence: "B1.2", hours: 6.00, workorder: "10/2021/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2021-11-11", reg: "OM-ZMI", ata: "5", taskType: "REP", desc: "Performed replacement of Sparks Plugs P/N 297656", workType: "SHOP", licence: "B1.2", hours: 2.00, workorder: "10/2021/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2021-11-11", reg: "OM-ZMI", ata: "5", taskType: "REP", desc: "Performed replacement of Engine Oil Filter", workType: "SHOP", licence: "B1.2", hours: 1.00, workorder: "10/2021/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2021-11-11", reg: "OM-ZMI", ata: "5", taskType: "SER", desc: "Performed servicing of Engine Oil Shell Ultra 4T 10W/40With Oil", workType: "SHOP", licence: "B1.2", hours: 1.00, workorder: "10/2021/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2021-12-09", reg: "OM-KAB", ata: "5", taskType: "GVI", desc: "Performed 50 Hrs Inspection of Airframe.", workType: "SHOP", licence: "B1.2", hours: 6.00, workorder: "04/2021/KAB", verifiedBy: "SK.CAO.009" },
  { date: "2021-12-09", reg: "OM-KAB", ata: "5", taskType: "GVI", desc: "Performed 50 Hrs Inspection of Engine.", workType: "SHOP", licence: "B1.2", hours: 6.00, workorder: "04/2021/KAB", verifiedBy: "SK.CAO.009" },
  { date: "2021-12-09", reg: "OM-KAB", ata: "5", taskType: "GVI", desc: "Performed 50 Hrs Inspection of Propeller", workType: "SHOP", licence: "B1.2", hours: 2.00, workorder: "04/2021/KAB", verifiedBy: "SK.CAO.009" },
  { date: "2021-12-09", reg: "OM-KAB", ata: "5", taskType: "REM", desc: "Performed replacement of Engine Oil Filter", workType: "SHOP", licence: "B1.2", hours: 1.00, workorder: "04/2021/KAB", verifiedBy: "SK.CAO.009" },
  { date: "2021-12-09", reg: "OM-KAB", ata: "5", taskType: "SER", desc: "Performed servicing of Engine With Oil", workType: "SHOP", licence: "B1.2", hours: 2.00, workorder: "04/2021/KAB", verifiedBy: "SK.CAO.009" },
  { date: "2021-12-21", reg: "OM-FFL", ata: "5", taskType: "IND", desc: "Performed 100/200 Hrs Airframe inspection", workType: "SHOP", licence: "B1.2", hours: 8.00, workorder: "07/2021/FFL", verifiedBy: "SK.CAO.009" },
  { date: "2021-12-21", reg: "OM-FFL", ata: "5", taskType: "GVI", desc: "Performed 100/200 Hrs Engine Inspection", workType: "SHOP", licence: "B1.2", hours: 6.00, workorder: "07/2021/FFL", verifiedBy: "SK.CAO.009" },
  { date: "2021-12-21", reg: "OM-FFL", ata: "5", taskType: "GVI", desc: "Performed 100 Hrs Propeller inspection", workType: "SHOP", licence: "B1.2", hours: 4.00, workorder: "07/2021/FFL", verifiedBy: "SK.CAO.009" },
  { date: "2021-12-21", reg: "OM-FFL", ata: "5", taskType: "REM", desc: "Performed replacement of Oil Filter P/N 825012", workType: "SHOP", licence: "B1.2", hours: 0.50, workorder: "07/2021/FFL", verifiedBy: "SK.CAO.009" },
  { date: "2021-12-21", reg: "OM-FFL", ata: "5", taskType: "SER", desc: "Performed servicing of Engine With Oil Shell Ultra 4T 10W/40", workType: "SHOP", licence: "B1.2", hours: 1.00, workorder: "07/2021/FFL", verifiedBy: "SK.CAO.009" },
  { date: "2022-02-14", reg: "OK-HSO", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.3", hours: 3.00, workorder: "01.02.22-02" },
  { date: "2022-02-16", reg: "OM-BHK", ata: "5", taskType: "SPC", desc: "Performed Engine History recorder Reading", workType: "Base", licence: "B1.3", hours: 1.00, workorder: "01.02.22/81-235 52" },
  { date: "2022-02-16", reg: "OM-BHK", ata: "5", taskType: "SUP", desc: "Supervised performed work - IGB, TGB Oil Sample.", workType: "Base", licence: "B1.3", hours: 5.00, workorder: "01.02.22/81-235 52" },
  { date: "2022-02-16", reg: "OM-BHK", ata: "5", taskType: "GVI", desc: "Performed Inspect And Test Ground Receptacle", workType: "Base", licence: "B1.3", hours: 2.00, workorder: "01.02.22/81-235 52" },
  { date: "2022-02-17", reg: "OM-BHK", ata: "34", taskType: "SPC", desc: "Performed Avionics/Altimeter/Transponder/NAV/ELT 12 M Inspection", workType: "Base", licence: "B2", hours: 9.00, workorder: "01.02.22/81-235 52" },
  { date: "2022-02-18", reg: "OM-BHK", ata: "5", taskType: "FUC", desc: "Performed Pitot-Static system test. Altimeter test", workType: "Base", licence: "B2", hours: 8.00, workorder: "01.02.22/81-235 52" },
  { date: "2022-02-21", reg: "OE-XMF", ata: "5", taskType: "SPC", desc: "Performed XPDR Test.", workType: "Base", licence: "B2", hours: 4.00, workorder: "01.03.22/114037 2" },
  { date: "2022-02-22", reg: "OM-BHK", ata: "5", taskType: "REP", desc: "Performed replacement of Digital Clock Battery.", workType: "Base", licence: "B2", hours: 2.00, workorder: "01.02.22/81-235 52" },
  { date: "2022-03-15", reg: "OM-ZMI", ata: "5", taskType: "GVI", desc: "Performed CRS after maintenance", workType: "SHOP", licence: "B1.2", hours: 1.00, workorder: "01/2022/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2022-03-15", reg: "OM-ZMI", ata: "5", taskType: "GVI", desc: "Performed inspection of Engine", workType: "SHOP", licence: "B1.2", hours: 6.00, workorder: "01/2022/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2022-03-15", reg: "OM-ZMI", ata: "5", taskType: "GVI", desc: "Performed inspection of Propeller", workType: "SHOP", licence: "B1.2", hours: 2.00, workorder: "01/2022/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2022-03-15", reg: "OM-ZMI", ata: "5", taskType: "REP", desc: "Performed replacement of Oil Filter", workType: "SHOP", licence: "B1.2", hours: 1.00, workorder: "01/2022/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2022-03-15", reg: "OM-ZMI", ata: "5", taskType: "SER", desc: "Performed servicing of engine oil", workType: "SHOP", licence: "B1.2", hours: 0.50, workorder: "01/2022/ZMI", verifiedBy: "SK.CAO.009" },
  { date: "2022-03-15", reg: "OE-XMF", ata: "5", taskType: "FUC", desc: "Performed Magneto Timing according to Lyc. SB183A", workType: "Base", licence: "B1.4", hours: 4.00, workorder: "01.03.22/114037 2" },
  { date: "2022-03-16", reg: "OE-XMF", ata: "5", taskType: "SPC", desc: "Performed Capacity Test GILL Battery acc. GILL CMM Q01-1120", workType: "Base", licence: "B2", hours: 8.00, workorder: "01.03.22/114037 2" },
  { date: "2022-03-17", reg: "OM-BHK", ata: "64", taskType: "REP", desc: "Performed replacement T/R Spring capsule Assy.", workType: "Base", licence: "B1.3", hours: 9.99, workorder: "01.02.22/81-235 52" },
  { date: "2022-03-18", reg: "OM-BHK", ata: "5", taskType: "SPC", desc: "Performed Ultrasonic test inspection of the M/R hub spindle.", workType: "Base", licence: "B1.3", hours: 9.99, workorder: "01.02.22/81-235 52" },
  { date: "2022-03-20", reg: "OE-XMF", ata: "5", taskType: "SPC", desc: "Performed Pilot-Static system test. Altimeter test", workType: "Base", licence: "B2", hours: 8.00, workorder: "01.03.22/114037 2" },
  { date: "2022-03-21", reg: "OM-BHK", ata: "49", taskType: "REP", desc: "Performed exchange fuel control unit.", workType: "Base", licence: "B1.3", hours: 4.00, workorder: "01.02.22/81-235 52" },
  { date: "2022-03-22", reg: "OE-XMF", ata: "5", taskType: "SPC", desc: "Performed Compass Swing", workType: "Base", licence: "B2", hours: 6.00, workorder: "01.03.22/114037 2" },
  { date: "2022-03-23", reg: "OM-CBS", ata: "5", taskType: "GVI", desc: "Performed inspection of the engine.", workType: "SHOP", licence: "B1.2", hours: 4.00, workorder: "01/2022/CBS", verifiedBy: "SK.CAO.009" },
  { date: "2022-03-23", reg: "OM-CBS", ata: "5", taskType: "GVI", desc: "Performed inspection of the propeller.", workType: "SHOP", licence: "B1.2", hours: 2.00, workorder: "01/2022/CBS", verifiedBy: "SK.CAO.009" },
  { date: "2022-03-23", reg: "OM-CBS", ata: "5", taskType: "SER", desc: "Performed servicing of engine with oil.", workType: "SHOP", licence: "B1.2", hours: 1.00, workorder: "01/2022/CBS", verifiedBy: "SK.CAO.009" },
  { date: "2022-03-23", reg: "OM-CBS", ata: "5", taskType: "REP", desc: "Performed replacement of engine oil filter.", workType: "SHOP", licence: "B1.2", hours: 1.00, workorder: "01/2022/CBS", verifiedBy: "SK.CAO.009" },
  { date: "2022-03-23", reg: "OM-CBS", ata: "5", taskType: "FUC", desc: "Performed carburetors synchronization", workType: "SHOP", licence: "B1.2", hours: 1.00, workorder: "01/2022/CBS", verifiedBy: "SK.CAO.009" },
  { date: "2022-03-23", reg: "OM-FFL", ata: "5", taskType: "REM", desc: "Performed Removal of engine ROTAX 912 ULS2", workType: "Base", licence: "B3", hours: 9.99, workorder: "01/2022/FFL" },
  { date: "2022-03-23", reg: "OE-XMF", ata: "5", taskType: "DUP", desc: "Performed Double Inspection After Maintenance.", workType: "Base", licence: "B1.4", hours: 8.00, workorder: "01.03.22/114037 2" },
  { date: "2022-03-24", reg: "OM-FFL", ata: "5", taskType: "INS", desc: "Performed Installation of engine ROTAX 912 ULS2", workType: "Base", licence: "B3", hours: 9.99, workorder: "01/2022/FFL" },
  { date: "2022-03-25", reg: "OM-FFL", ata: "5", taskType: "DVI", desc: "Performed 400 H Engine inspection", workType: "Base", licence: "B3", hours: 6.00, workorder: "01/2022/FFL" },
  { date: "2022-03-25", reg: "OM-FFL", ata: "5", taskType: "SER", desc: "Performed servicing of engine with oil.", workType: "Base", licence: "B3", hours: 1.00, workorder: "01/2022/FFL" },
  { date: "2022-03-27", reg: "OM-FFL", ata: "5", taskType: "REM", desc: "Performed inspection of the propeller.", workType: "Base", licence: "B3", hours: 3.00, workorder: "01/2022/FFL" },
  { date: "2022-03-29", reg: "OM-GGB", ata: "5", taskType: "GVI", desc: "Performed 25H inspection of Airframe", workType: "Base", licence: "B1.4", hours: 3.00, workorder: "WO 01.03.22/S1928" },
  { date: "2022-03-29", reg: "OM-GGB", ata: "5", taskType: "GVI", desc: "Performed 50H inspection of Airframe", workType: "Base", licence: "B1.4", hours: 4.00, workorder: "WO 01.03.22/S1928" },
  { date: "2022-03-29", reg: "OM-GGB", ata: "5", taskType: "GVI", desc: "Performed 50H inspection of Engine", workType: "Base", licence: "B1.4", hours: 3.00, workorder: "WO 01.03.22/S1928" },
  { date: "2022-03-30", reg: "OM-FFL", ata: "5", taskType: "GVI", desc: "Performed SB SD4-02-2020", workType: "Base", licence: "B3", hours: 3.00, workorder: "01/2022/FFL" },
  { date: "2022-03-30", reg: "OM-GGB", ata: "5", taskType: "GVI", desc: "Performed 100H inspection of Airframe", workType: "Base", licence: "B1.4", hours: 6.00, workorder: "WO 01.03.22/S1928" },
  { date: "2022-03-30", reg: "OM-GGB", ata: "5", taskType: "GVI", desc: "Performed 200H inspection of Airframe", workType: "Base", licence: "B1.4", hours: 4.00, workorder: "WO 01.03.22/S1928" },
  { date: "2022-03-31", reg: "OM-GGB", ata: "5", taskType: "GVI", desc: "Performed 12M / Annual inspection of Airframe", workType: "Base", licence: "B1.4", hours: 8.00, workorder: "WO 01.03.22/S1928" },
  { date: "2022-03-31", reg: "OM-GGB", ata: "5", taskType: "GVI", desc: "Performed 100H inspection of Engine", workType: "Base", licence: "B1.4", hours: 6.00, workorder: "WO 01.03.22/S1928" },
  { date: "2022-03-31", reg: "OM-GGB", ata: "4", taskType: "OPC", desc: "Performed Fire Extinguisher Wighting", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "WO 01.03.22/S1928" },
  { date: "2022-04-01", reg: "OM-KAB", ata: "5", taskType: "DVI", desc: "Performed SID operation 1, 2", workType: "Base", licence: "B3", hours: 8.00, workorder: "01/2022/KAB" },
  { date: "2022-04-01", reg: "OM-GGB", ata: "4", taskType: "IND", desc: "Performed 12M avionics inspection of Altimeter, Pitot-Static System, XPDR, ELT, Battery", workType: "Base", licence: "B2", hours: 8.00, workorder: "WO 01.03.22/S1928" },
  { date: "2022-04-02", reg: "OM-KAB", ata: "5", taskType: "GVI", desc: "Performed 200 H Inspection of the airframe", workType: "Base", licence: "B3", hours: 8.00, workorder: "01/2022/KAB" },
  { date: "2022-04-04", reg: "OM-KAB", ata: "5", taskType: "GVI", desc: "Performed 200 H inspection of the Engine", workType: "Base", licence: "B3", hours: 8.00, workorder: "01/2022/KAB" },
  { date: "2022-04-04", reg: "OM-GGB", ata: "5", taskType: "MOD", desc: "Performed Service Bulletin AD US 2015-25-01, US 2015-19-07, SB 480F", workType: "Base", licence: "B1.4", hours: 6.00, workorder: "WO 01.03.22/S1928" },
  { date: "2022-04-04", reg: "OM-GGB", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.4", hours: 4.00, workorder: "WO 01.03.22/S1928" },
  { date: "2022-04-05", reg: "OM-KAB", ata: "5", taskType: "GVI", desc: "Performed Annual inspection of the Aircraft", workType: "Base", licence: "B3", hours: 8.00, workorder: "01/2022/KAB" },
  { date: "2022-04-06", reg: "OM-EAS", ata: "5", taskType: "SPC", desc: "Performed special check of TQ of main rotor retention nut and droop stop retainer nut at first 10 Hrs of operation.", workType: "Base", licence: "B1.4", hours: 4.00, workorder: "WO 01.04.22/0283" },
  { date: "2022-04-06", reg: "OM-KAB", ata: "5", taskType: "GVI", desc: "Performed SID No. 25,26,27", workType: "Base", licence: "B3", hours: 8.00, workorder: "01/2022/KAB" },
  { date: "2022-04-07", reg: "OM-KAB", ata: "5", taskType: "ADJ", desc: "Performed Magnetic Compass Kalibration", workType: "Base", licence: "B3", hours: 3.00, workorder: "01/2024/KAB" },
  { date: "2022-04-07", reg: "OM-KAB", ata: "5", taskType: "GVI", desc: "Performed Release to Service after Inspection.", workType: "Base", licence: "B3", hours: 3.00, workorder: "01/2024/KAB" },
  { date: "2022-04-28", reg: "OK-HSO", ata: "5", taskType: "REP", desc: "Performed exchange of Indicator el. tachometer P/N 369D24518", workType: "Base", licence: "B2", hours: 6.00, workorder: "03.04.22/0200 E" },
  { date: "2022-05-04", reg: "OM-FFL", ata: "5", taskType: "FUC", desc: "Performed carburetors synchronization", workType: "Base", licence: "B3", hours: 3.00, workorder: "01/2022/FFL" },
  { date: "2022-05-05", reg: "OM-HCY", ata: "5", taskType: "GVI", desc: "Performed 25 Hr Inspection of Airframe", workType: "Base", licence: "B1.4", hours: 3.00, workorder: "01.05.22/0288" },
  { date: "2022-05-05", reg: "OM-HCY", ata: "5", taskType: "SER", desc: "Performed 25 Hr Lubrication.", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "01.05.22/0288" },
  { date: "2022-05-05", reg: "OM-HCY", ata: "5", taskType: "SER", desc: "Performed 25 Hr Lubrication.", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "01.05.22/0288" },
  { date: "2022-05-06", reg: "OM-HCY", ata: "5", taskType: "GVI", desc: "Performed 50/100 Hrs Inspection of Airframe", workType: "Base", licence: "B1.4", hours: 8.00, workorder: "01.05.22/0288" },
  { date: "2022-05-08", reg: "OM-HCY", ata: "5", taskType: "REP", desc: "Performed replacement of Engine Oil Filter.", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "01.05.22/0288" },
  { date: "2022-05-09", reg: "OM-HCY", ata: "5", taskType: "GVI", desc: "Performed SB 480F, AD 2015-23-01, AD US 2015-19-07", workType: "Base", licence: "B1.4", hours: 5.00, workorder: "01.05.22/0288" },
  { date: "2022-05-09", reg: "OM-HCY", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.4", hours: 3.00, workorder: "01.05.22/0288" },
  { date: "2022-05-12", reg: "OK-EAI", ata: "5", taskType: "GVI", desc: "Performed 35 Hrs / 200 TE M/R Blade Root Fittings Inspection.", workType: "Base", licence: "B1.3", hours: 3.00, workorder: "03.05.22/0392 E" },
  { date: "2022-05-12", reg: "OK-EAI", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.3", hours: 2.00, workorder: "03.05.22/0392 E" },
  { date: "2022-05-16", reg: "OE-XRN", ata: "5", taskType: "GVI", desc: "Performed Daily/25/50/100/150 Hrs Inspection of Airframe.", workType: "Base", licence: "B1.4", hours: 8.00, workorder: "01.05.22/S1544" },
  { date: "2022-05-16", reg: "OE-XRN", ata: "5", taskType: "SER", desc: "Performed 25/50/100 Hrs Lubrication", workType: "Base", licence: "B1.4", hours: 4.00, workorder: "01.05.22/S1544" },
  { date: "2022-05-17", reg: "OE-XRN", ata: "5", taskType: "GVI", desc: "Performed 600 Hrs/24 M Thrust Bearing Lubrication, 1200 Hrs/24 M T/R Swashplate Lubrication, 1200 Hrs/24 M Shrwashplate Bearing Lubrication.", workType: "Base", licence: "B1.4", hours: 6.00, workorder: "01.05.22/S1544" },
  { date: "2022-05-17", reg: "OK-HSO", ata: "5", taskType: "INS", desc: "Performed installation M/R Blades P/N 500P2100-105", workType: "Base", licence: "B1.3", hours: 3.00, workorder: "03.04.22/0200 E" },
  { date: "2022-05-17", reg: "OK-HSO", ata: "5", taskType: "DVI", desc: "Performed 35 Hrs / 200 TE M/R Blade Root Fittings Inspection.", workType: "Base", licence: "B1.3", hours: 3.00, workorder: "03.04.22/0200 E" },
  { date: "2022-05-17", reg: "OE-XRN", ata: "5", taskType: "GVI", desc: "Performed 50/100 Hrs Inspection of Engine.", workType: "Base", licence: "B1.4", hours: 6.00, workorder: "01.05.22/S1544" },
  { date: "2022-05-18", reg: "OE-XRN", ata: "5", taskType: "GVI", desc: "Performed SB 480F, AD 2015-23-01, AD US 2015-19-07", workType: "Base", licence: "B1.4", hours: 5.00, workorder: "01.05.22/S1544" },
  { date: "2022-05-18", reg: "OE-XRN", ata: "5", taskType: "GVI", desc: "Performed 12 M exchange of T/R GBX, M/R GBX Oil.", workType: "Base", licence: "B1.4", hours: 4.00, workorder: "01.05.22/S1544" },
  { date: "2022-05-18", reg: "OK-PKS", ata: "5", taskType: "GVI", desc: "Performed 35 Hrs / 200 TE M/R Blade Root Fittings Inspection.", workType: "Base", licence: "B1.3", hours: 3.00, workorder: "02.05.22/O191E" },
  { date: "2022-05-18", reg: "OK-PKS", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.3", hours: 2.00, workorder: "02.05.22/O191E" },
  { date: "2022-05-18", reg: "OK-HSO", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.3", hours: 3.00, workorder: "03.04.22/0200 E" },
  { date: "2022-05-19", reg: "OM-GGB", ata: "5", taskType: "TBSH", desc: "Performed troubleshooting of Longitude Trimmer", workType: "Base", licence: "B2", hours: 8.00, workorder: "WO 02.05.22/S1928" },
  { date: "2022-05-19", reg: "OM-GGB", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.4", hours: 3.00, workorder: "WO 02.05.22/S1928" },
  { date: "2022-05-20", reg: "OE-XRN", ata: "5", taskType: "GVI", desc: "Performed Fire Extinguisher Inspection and weighting. Performed SB N183.3 - T/R Blades Leading Edge Insp.", workType: "Base", licence: "B1.4", hours: 4.00, workorder: "01.05.22/S1544" },
  { date: "2022-05-23", reg: "OE-XRN", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.4", hours: 4.00, workorder: "01.05.22/S1544" },
  { date: "2022-05-24", reg: "OM-EAS", ata: "5", taskType: "SER", desc: "Performed 6M/400 Hrs Battery Gill Capacity Check.", workType: "Base", licence: "B2", hours: 8.00, workorder: "WO 01.05.22/0283" },
  { date: "2022-05-24", reg: "OE-XMF", ata: "5", taskType: "GVI", desc: "Performed Daily/25/50/100/150 Hrs Inspection of Airframe.", workType: "Base", licence: "B1.4", hours: 8.00, workorder: "01.05.22/114037 2" },
  { date: "2022-05-24", reg: "OE-XMF", ata: "5", taskType: "GVI", desc: "Performed AD 2017-14-06, AD-78-02-02, AD 89-20-03R1, AD 95-03-12", workType: "Base", licence: "B1.4", hours: 5.00, workorder: "01.05.22/114037 2" },
  { date: "2022-05-25", reg: "OM-EAS", ata: "5", taskType: "FUC", desc: "Performed 12M avionics inspection - Altimeter, Pitot Static, XPDR, NAV-COM, Compass Swing, ELT", workType: "Base", licence: "B2", hours: 8.00, workorder: "WO 01.05.22/0283" },
  { date: "2022-05-25", reg: "OE-XMF", ata: "5", taskType: "GVI", desc: "Performed 50/100 Hrs Inspection of Engine", workType: "Base", licence: "B1.4", hours: 6.00, workorder: "01.05.22/114037 2" },
  { date: "2022-05-25", reg: "OE-XMF", ata: "5", taskType: "REM", desc: "Performed SB480 - Oil and Filter Change.", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "01.05.22/114037 2" },
  { date: "2022-05-25", reg: "OE-XMF", ata: "5", taskType: "FUC", desc: "Performed Magneto Timing according to Lyc. SB183A", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "01.05.22/114037 2" },
  { date: "2022-05-25", reg: "OE-XMF", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "01.05.22/114037 2" },
  { date: "2022-05-26", reg: "OM-EAS", ata: "5", taskType: "SPC", desc: "Performed 12M Fire Extinguisher weighting", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "WO 01.05.22/0283" },
  { date: "2022-05-30", reg: "OM-EAS", ata: "5", taskType: "INS", desc: "Performed installation of M/R Blades.", workType: "Base", licence: "B1.4", hours: 4.00, workorder: "WO 01.05.22/0283" },
  { date: "2022-05-30", reg: "OM-EAS", ata: "5", taskType: "CRS", desc: "Released the aircraft for service after maintenance.", workType: "Base", licence: "B1.4", hours: 4.00, workorder: "WO 01.05.22/0283" },
  { date: "2022-05-30", reg: "OM-FFL", ata: "5", taskType: "GVI", desc: "Performed 100 H Inspection of the Airframe, Engine and Propeller", workType: "Base", licence: "B3", hours: 8.00, workorder: "02/2022/FFL" },
  { date: "2022-05-30", reg: "OM-FFL", ata: "5", taskType: "REP", desc: "Performed Replacement of MLG tyre", workType: "Base", licence: "B3", hours: 2.00, workorder: "02/2022/FFL" },
  { date: "2022-06-01", reg: "OM-FFL", ata: "5", taskType: "REP", desc: "Performed Replacement of left Shock Cord ring.", workType: "Base", licence: "B3", hours: 3.00, workorder: "02/2022/FFL" },
  { date: "2022-06-01", reg: "OM-FFL", ata: "5", taskType: "GVI", desc: "Performed Release to service.", workType: "Base", licence: "B3", hours: 3.00, workorder: "02/2022/FFL" },
  { date: "2022-06-09", reg: "OM-PAC", ata: "5", taskType: "GVI", desc: "Performed 50 H Inspection of the engine, airframe and propeller.", workType: "Base", licence: "B3", hours: 6.00, workorder: "02/2022/PAC" },
  { date: "2022-06-09", reg: "OM-PAC", ata: "5", taskType: "GVI", desc: "Performed SID No.2", workType: "Base", licence: "B3", hours: 2.00, workorder: "02/2022/PAC" },
  { date: "2022-06-09", reg: "OM-PAC", ata: "5", taskType: "GVI", desc: "Performed SID No.2", workType: "Base", licence: "B3", hours: 2.00, workorder: "02/2022/PAC" },
  { date: "2022-06-09", reg: "OM-PAC", ata: "5", taskType: "GVI", desc: "Performed SID No.2", workType: "Base", licence: "B3", hours: 2.00, workorder: "02/2022/PAC" },
  { date: "2022-06-09", reg: "OM-PAC", ata: "5", taskType: "GVI", desc: "Performed Release to service after inspection", workType: "Base", licence: "B3", hours: 3.00, workorder: "02/2022/PAC" },
  { date: "2022-06-13", reg: "OM-BHK", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.3", hours: 9.99, workorder: "01.02.22/81-235 52" },
  { date: "2022-06-14", reg: "OE-XMF", ata: "5", taskType: "GVI", desc: "Performed 25 Hr Inspection of Airframe", workType: "Base", licence: "B1.4", hours: 3.00, workorder: "02.06.22/114037 2" },
  { date: "2022-06-14", reg: "OE-XMF", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "02.06.22/114037 2" },
  { date: "2022-06-30", reg: "OK-HSO", ata: "25", taskType: "REP", desc: "Performed replacement of ELT Battery Kit 200.", workType: "Base", licence: "B2", hours: 2.00, workorder: "02.06.22/0200 E" },
  { date: "2022-06-30", reg: "OK-HSO", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.3", hours: 2.00, workorder: "02.06.22/0200 E" },
  { date: "2022-07-08", reg: "OM-EAS", ata: "4", taskType: "GVI", desc: "Performed 25H inspection of Airframe", workType: "Base", licence: "B1.4", hours: 3.00, workorder: "WO 01.07.22/0288" },
  { date: "2022-07-08", reg: "OM-EAS", ata: "4", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "WO 01.07.22/0288" },
  { date: "2022-07-08", reg: "OM-HCY", ata: "5", taskType: "GVI", desc: "Performed 25 Hr Inspection of Airframe", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "01.07.22/0288" },
  { date: "2022-07-08", reg: "OM-HCY", ata: "5", taskType: "SER", desc: "Performed 25 Hr Lubrication.", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "01.07.22/0288" },
  { date: "2022-07-08", reg: "OM-HCY", ata: "5", taskType: "CRS", desc: "Released the aircraft for service", workType: "Base", licence: "B1.4", hours: 2.00, workorder: "01.07.22/0288" },
  { date: "2022-07-21", reg: "OM-FFL", ata: "5", taskType: "GVI", desc: "Performed 100/200 Hrs Engine Inspection", workType: "Base", licence: "B3", hours: 6.00, workorder: "03/2022/FFL" },
  { date: "2022-07-21", reg: "OM-FFL", ata: "5", taskType: "GVI", desc: "Performed 100 Hrs Propeller Inspection", workType: "Base", licence: "B3", hours: 3.00, workorder: "03/2022/FFL" },
  { date: "2022-07-21", reg: "OM-FFL", ata: "5", taskType: "SER", desc: "Performed servicing of Engine With Oil.", workType: "Base", licence: "B3", hours: 2.00, workorder: "03/2022/FFL" },
  { date: "2022-07-22", reg: "OK-HSO", ata: "5", taskType: "DUP", desc: "Performed Double Inspection", workType: "Base", licence: "B1.3", hours: 9.99, workorder: "01.07.22/0200 E" },
  { date: "2022-07-25", reg: "OM-CBS", ata: "5", taskType: "GVI", desc: "Performed servicing of Engine With Oil.", workType: "Base", licence: "B3", hours: 2.00, workorder: "02/2022/CBS" },
  { date: "2022-07-25", reg: "OM-CBS", ata: "5", taskType: "GVI", desc: "Performed 100 Hrs Engine Inspection.", workType: "Base", licence: "B3", hours: 6.00, workorder: "02/2022/CBS" },
  { date: "2022-07-26", reg: "OM-CBS", ata: "5", taskType: "OPC", desc: "Performed Magnetic Compass Calibration", workType: "Base", licence: "B3", hours: 4.00, workorder: "02/2022/CBS" },
  { date: "2022-07-26", reg: "OM-CBS", ata: "5", taskType: "SPC", desc: "Performed Pitot-Static and Altimeter check.", workType: "Base", licence: "B3", hours: 3.00, workorder: "02/2022/CBS" },
  { date: "2022-07-26", reg: "OM-CBS", ata: "5", taskType: "FUC", desc: "Performed Functional Check of ELT", workType: "Base", licence: "B2", hours: 2.00, workorder: "02/2022/CBS" },
  { date: "2022-08-03", reg: "OM-GGB", ata: "5", taskType: "GVI", desc: "Performed 25H/50H inspection of Airframe.", workType: "Base", licence: "B1.4", hours: 6.00, workorder: "WO 02.08.22/S1928" },
  { date: "2022-08-03", reg: "OM-GGB", ata: "5", taskType: "GVI", desc: "Performed 50H inspection of Engine", workType: "Base", licence: "B1.4", hours: 3.00, workorder: "WO 02.08.22/S1928" },
  { date: "2022-08-03", reg: "OM-GGB", ata: "5", taskType: "MOD", desc: "Performed Service Bulletin 480F", workType: "Base", licence: "B1.4", hours: 1.00, workorder: "WO 02.08.22/S1928" },
];

async function main() {
  console.log("Seeding database...");

  // Upsert task types
  for (const tt of taskTypes) {
    await prisma.taskType.upsert({
      where: { code: tt.code },
      update: {},
      create: tt,
    });
  }
  console.log(`Seeded ${taskTypes.length} task types`);

  // Upsert licence categories
  for (const lc of licenceCategories) {
    await prisma.licenceCategory.upsert({
      where: { code: lc.code },
      update: {},
      create: lc,
    });
  }
  console.log(`Seeded ${licenceCategories.length} licence categories`);

  // Upsert aircraft
  for (const ac of aircraftData) {
    await prisma.aircraft.upsert({
      where: { registration: ac.registration },
      update: {},
      create: ac,
    });
  }
  console.log(`Seeded ${aircraftData.length} aircraft`);

  // Get lookup maps
  const allAircraft = await prisma.aircraft.findMany();
  const allTaskTypes = await prisma.taskType.findMany();
  const allLicences = await prisma.licenceCategory.findMany();

  const aircraftMap = new Map(allAircraft.map((a) => [a.registration, a.id]));
  const taskTypeMap = new Map(allTaskTypes.map((t) => [t.code, t.id]));
  const licenceMap = new Map(allLicences.map((l) => [l.code, l.id]));

  // Insert log entries
  let created = 0;
  for (const entry of logEntries) {
    const aircraftId = aircraftMap.get(entry.reg);
    const taskTypeId = taskTypeMap.get(entry.taskType);
    const licenceCategoryId = licenceMap.get(entry.licence);

    if (!aircraftId || !taskTypeId || !licenceCategoryId) {
      console.warn(`Skipping entry: ${entry.date} ${entry.reg} - missing reference (aircraft: ${aircraftId}, taskType: ${taskTypeId}, licence: ${licenceCategoryId})`);
      continue;
    }

    await prisma.logEntry.create({
      data: {
        date: new Date(entry.date),
        aircraftId,
        ata: entry.ata,
        taskTypeId,
        taskDescription: entry.desc,
        workType: entry.workType,
        licenceCategoryId,
        durationHours: entry.hours,
        workorder: entry.workorder || null,
        verifiedBy: entry.verifiedBy || null,
      },
    });
    created++;
  }

  console.log(`Seeded ${created} log entries`);
  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
