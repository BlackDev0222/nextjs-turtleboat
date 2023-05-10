import { Question } from "@/types/question.type";

export const basicprofilequestions: Array<Array<Question>> = [
  [
    {
      question: "First name",
      name: "firstname",
      type: "text",
      placeholder: "Vicky",
      required: true,
    },
    {
      question: "Middle name",
      name: "middlename",
      placeholder: "Wu",
      type: "text"
    },
    {
      question: "Last name",
      name: "lastname",
      placeholder: "Davis",
      type: "text",
      required: true
    }
  ],
  [
    {
      question: "Mobile number",
      name: "mobile",
      type: "phone",
      required: true
    },
    {
      question: "Email address",
      name: "email",
      placeholder: "vickyswu@gmail.com",
      type: "email",
      required: true
    }
  ],
  [
    {
      question: "Linkedin Profile",
      name: "linkedin_profile",
      placeholder: "https://linkedin.com/vicky***",
      type: "url",
    },
    {
      question: "Twitter Profile",
      name: "twitter_profile",
      placeholder: "https://twitter.com/***",
      type: "url",
    }
  ],
  [
    {
      question: "Country",
      name: "country",
      type: "text",
      required: true
    },
    {
      question: "State / Province",
      name: "region",
      type: "text",
      required: true
    },
    {
      question: "City",
      name: "city",
      type: "text",
      required: true
    },
  ],
  [
    {
      question: "Who referred you to yCITIES/Turtle Boat(must have a referral)?",
      name: "referrer",
      placeholder: "Vicky Wu Davis",
      type: "text",
      required: true
    },
    {
      question: "",
      type: "",
    }
  ],
  [
    {
      question: "Have Prior Mentoring Experience?",
      name: "mentor_experience",
      type: "radio",
      required: true,
      candidates: [
        "Yes", "No"
      ]
    }
  ],
  [
    {
      question: `As a CORE Member, you are by default an Ad Hoc Subject-Matter-Expert for "Entrepreneurial Roadside Assistance" (receiving and/or giving one-off help...the entrepreneurial equivalent of helping someone change a flat w/a temporary tire so the driver can reach their next destination) unless you opt-out by checking the box below. In addition to ERA, please indicate your potential interest for community engagement (checking a box indicates that you'd like more info, it is not a commitment; can check more than 1 box):`,
      name: "membership_interest",
      type: "checkbox",
      required: true,
      candidates: [
        `Entrepreneurial Roadside Assistance (ERA) is offered to all CORE Members. Capitalizing on your areas of expertise (if/when the occasion arises), these 1-off requests for help can take the form of an asynchronous virtual brainstorm, an ask for a warm email intro, a 15min brainstorming Zoom, or a 30min prototyping support Zoom). If you choose to opt out of ERA, please select -- from the below options -- at least 1 additional way you'd like to interact with the CORE Community`,
        "Mentoring (as a generalist, helping mentees maximize their entrepreneurial education/journey)",
        "Being Mentored in RATlabs (for a startups between idea stage to pre-accelerator stage)",
        "Pitch Deck modding to help a founder refine (mostly asynchronous work)",
        "Participating as a mock investor Mangrove Mock Angels Group (for student ventures that are not legal entities)",
        "Giving (virtual) NanoTalks about something you are very passionate about (10 min Talk + 10 min Q&A)",
        "Follow the progress of particular venture(s) as a spectator (timing & ventures may vary from cycle to cycle)",
        "participate in 15min Monthly Virtual Coffees with other members of the CORE Community (3 person min, 5 person max, 1st come basis)"
      ]
    }
  ],
  [
    {
      question: "If Zoom meetings are needed, which options generally work best for you?",
      name: "meet_time",
      type: "checkbox",
      required: true,
      candidates: [
        "Mondays between 5pm to 7pm ET",
        "Tuesdays between 5pm to 7pm",
        "Thursdays between 5pm to 7pm",
        "Fridays at noon ET",
        "Fridays at 1pm ET"
      ]
    }
  ]
]