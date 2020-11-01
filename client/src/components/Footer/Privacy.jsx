import React from "react";
import "./About.css";

// reactstrap components
import { Container, Row, Col } from "react-bootstrap";

const Terms = () => {
  return (
    <Container className="container-about-use">
      <Col xs={2}></Col>
      <div id="about">
        <Container>
          <div className="title">
            <h2 className="title-1">Privacy policy</h2>
            <br></br>
            <h4 className="main-1">
              This Privacy Policy describes how your personal information is
              collected, used, and shared when you visit or make a purchase from
              the “Site”.{" "}
              <p>
                Personal information we collect When you visit the Site, we
                automatically collect certain information about your device,
                including information about your web browser, IP address, time
                zone, and some of the cookies that are installed on your device.
                Additionally, as you browse the Site, we collect information
                about the individual web pages or products that you view, what
                websites or search terms referred you to the Site, and
                information about how you interact with the Site. We refer to
                this automatically-collected information as “Device
                Information”. We collect Device Information using the following
                technologies: - “Cookies” are data files that are placed on your
                device or computer and often include an anonymous unique
                identifier. For more information about cookies, and how to
                disable cookies, visit http://www.allaboutcookies.org. - “Log
                files” track actions occurring on the Site, and collect data
                including your IP address, browser type, Internet service
                provider, referring/exit pages, and date/time stamps. - “Web
                beacons”, “tags”, and “pixels” are electronic files used to
                record information about how you browse the Site. Additionally
                when you make a purchase or attempt to make a purchase through
                the Site, we collect certain information from you, including
                your name, billing address, shipping address, payment
                information (including credit card numbers email address, and
                phone number. We refer to this information as “Order
                Information”.{" "}
              </p>
              <p>
                When we talk about “Personal Information” in this Privacy
                Policy, we are talking both about Device Information and Order
                Information. How do we use your personal information? We use the
                Order Information that we collect generally to fulfill any
                orders placed through the Site (including processing your
                payment information, arranging for shipping, and providing you
                with invoices and/or order confirmations). Additionally, we use
                this Order Information to: - Communicate with you; - Screen our
                orders for potential risk or fraud; and - When in line with the
                preferences you have shared with us, provide you with
                information or advertising relating to our products or services.
                We use the Device Information that we collect to help us screen
                for potential risk and fraud (in particular, your IP address),
                and more generally to improve and optimize our Site (for
                example, by generating analytics about how our customers browse
                and interact with the Site, and to assess the success of our
                marketing and advertising campaigns). Sharing you personal
                Information We share your Personal Information with third
                parties to help us use your Personal Information, as described
                above. For example, we use Shopify to power our online
                store--you can read more about how Shopify uses your Personal
                Information We also use Google Analytics to help us understand
                how our customers use the Site -- you can read more about how
                Google uses your Personal Information.
              </p>
              <p>
                {" "}
                You can also opt-out of Google Analytics. Finally, we may also
                share your Personal Information to comply with applicable laws
                and regulations, to respond to a subpoena, search warrant or
                other lawful request for information we receive, or to otherwise
                protect our rights.
              </p>
            </h4>
          </div>
        </Container>
      </div>
      <Col xs={2}></Col>
    </Container>
  );
};
export default Terms;
