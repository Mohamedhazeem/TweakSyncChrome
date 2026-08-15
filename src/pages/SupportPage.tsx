import { ContactSupportIcon } from "../components/Icons/ContactSupportIcon";
// import { FacebookIcon } from "@/components/Icons/socialMediaIcons/FacebookIcon";
// import { InstagramIcon } from "@/components/Icons/socialMediaIcons/InstagramIcon";
// import { RedditIcon } from "@/components/Icons/socialMediaIcons/RedditIcon";
// import { TwitterIcon } from "@/components/Icons/socialMediaIcons/TwitterIcon";

function SupportPage() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-red-400 h-dvh">
      <div className="SupportContainer">
        <div className="contactSupport">
          <p className="contactSupportTitle">Contact Support</p>
          <ContactSupportIcon />
          <p className="contactSupportDialogue">Still have a question or need our help?</p>
          <p className="contactSupportDialogue">
            Is there a feature you'd like to see? Let us know!
          </p>
          <a className="contactMail" href="mailto:support@tweaksync.dev">
            support@tweaksync.dev
          </a>
          {/* <p className="socialLinkDialogue">You can also find us here:</p>
          <div className="socialMediaIcons">
            <a
              href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F"
              title="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F"
              title="Reddit"
            >
              <RedditIcon />
            </a>
            <a
              href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F"
              title="X"
            >
              <TwitterIcon />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
