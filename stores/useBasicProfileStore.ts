import { create } from 'zustand';

export interface UserBasicProfile {
  firstName: string,
  middleName: string,
  lastName: string,
  mobileNumber: string,
  emailAddress: string,
  linkedinProfile: string,
  twitterProfile: string,
  residenceCountry: string,
  residenceRegion: string,
  residenceCity: string,
  referrer: string,
  mentorExperience: number,
  membershipInterest: Array<any>,
  meetTime: Array<any>,
  getFirstName: () => string,
  getMiddleName: () => string,
  getLastName: () => string,
  getMobileNumber: () => string,
  getEmailAddress: () => string,
  getLinkedinProfile: () => string,
  getTwitterProfile: () => string,
  getResidenceCountry: () => string,
  getResidenceRegion: () => string,
  getRecidenceCity: () => string,
  getReferrer: () => string,
  getMentorExperience: () => number,
  getMembershipInterest: () => Array<any>,
  getMeetTime: () => Array<any>,
  setFirstName: (firstName: string) => void,
  setMiddleName: (middleName: string) => void,
  setLastName: (lastName: string) => void,
  setMobileNumber: (mobileNumber: string) => void,
  setEmailAddress: (emailAddress: string) => void,
  setLinkedinProfile: (linkedinProfile: string) => void,
  setTwitterProfile: (twitterProfile: string) => void,
  setResidenceCountry: (residenceCountry: string) => void,
  setResidenceRegion: (residenceRegion: string) => void,
  setRecidenceCity: (residenceCity: string) => void,
  setReferrer: (referrer: string) => void,
  setMentorExperience: (mentorExperience: number) => void,
  setMembershipInterest: (membershipInterest: Array<any>) => void,
  setMeetTime: (meetTime: Array<any>) => void,
}

const basicProfileStore = create<UserBasicProfile>((set, get) => ({
  firstName: "",
  middleName: "",
  lastName: "",
  mobileNumber: "",
  emailAddress: "",
  linkedinProfile: "",
  twitterProfile: "",
  residenceCountry: "",
  residenceRegion: "",
  residenceCity: "",
  referrer: "",
  mentorExperience: -1,
  membershipInterest: [],
  meetTime: [],
  getFirstName: () => get().firstName,
  getMiddleName: () => get().middleName,
  getLastName: () => get().lastName,
  getMobileNumber: () => get().mobileNumber,
  getEmailAddress: () => get().emailAddress,
  getLinkedinProfile: () => get().linkedinProfile,
  getTwitterProfile: () => get().twitterProfile,
  getResidenceCountry: () => get().residenceCountry,
  getResidenceRegion: () => get().residenceRegion,
  getRecidenceCity: () => get().residenceCity,
  getReferrer: () => get().referrer,
  getMentorExperience: () => get().mentorExperience,
  getMembershipInterest: () => get().membershipInterest,
  getMeetTime: () => get().meetTime,
  setFirstName: (firstName: string) => set((state) => ({ firstName: firstName })),
  setMiddleName: (middleName: string) => set((state) => ({ middleName: middleName })),
  setLastName: (lastName: string) => set((state) => ({ lastName: lastName })),
  setMobileNumber: (mobileNumber: string) => set((state) => ({ mobileNumber: mobileNumber })),
  setEmailAddress: (emailAddress: string) => set((state) => ({ emailAddress: emailAddress })),
  setLinkedinProfile: (linkedinProfile: string) => set((state) => ({ linkedinProfile: linkedinProfile })),
  setTwitterProfile: (twitterProfile: string) => set((state) => ({ twitterProfile: twitterProfile })),
  setResidenceCountry: (residenceCountry: string) => set((state) => ({ residenceCountry: residenceCountry })),
  setResidenceRegion: (residenceRegion: string) => set((state) => ({ residenceRegion: residenceRegion })),
  setRecidenceCity: (residenceCity: string) => set((state) => ({ residenceCity: residenceCity })),
  setReferrer: (referrer: string) => set((state) => ({ referrer: referrer })),
  setMentorExperience: (mentorExperience: number) => set((state) => ({ mentorExperience: mentorExperience })),
  setMembershipInterest: (membershipInterest: Array<any>) => set((state) => ({ membershipInterest: membershipInterest })),
  setMeetTime: (meetTime: Array<any>) => set((state) => ({ meetTime: meetTime })),
}));

export default basicProfileStore;