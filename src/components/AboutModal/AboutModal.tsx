import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import "./AboutModal.css";

export default function AboutModal(props: any) {
  return (
    <>
      <Modal isOpen={props.open} onClose={props.toggleModal} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About PhillyTrails</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              During the early 2020 COVID-19 quarantine period, I started
              running more than I have since high school. Given how crowded the
              Schuylkill River Trail is through Center City, I started driving
              out to Fairmount Park and have ended up exploring different parts
              of the park almost every day.
            </p>
            <br />
            <p>
              I realized that there aren't great trail maps of urban trails in
              Philadelphia. Some of the agencies which manage particular areas
              (eg.{" "}
              <a
                href="https://www.schuylkillbanks.org/trail-map"
                target="_ blank"
                rel="noreferrer noopener"
                className={"m-link"}
              >
                Schuylkill Banks
              </a>
              ,{" "}
              <a
                href="https://fow.org/visit-the-park/maps/"
                target="_ blank"
                rel="noreferrer noopener"
                className={"m-link"}
              >
                {" "}
                Friends of the Wissahickon
              </a>
              ), but weren't any great consolidated digital maps of the whole
              area. There is a lot of content on OpenStreetMap, but digesting
              that data isn't straightforward.
            </p>
            <br />
            <p>
              As as side project, I decided to build this mapping platform from
              scratch with the features I think would be useful. I love maps,
              especially trail maps (of all kinds), and this has been a fun way
              to combine that with working on my software engineering skills.
            </p>
            <br />
            <p>
              In Fall 2021 I re-wrote the app in React and moved the geospatial
              data hosting to PostGIS. The project is open source and can be
              found{" "}
              <a
                href="https://github.com/brandonfcohen1/phillytrails-app"
                target="_ blank"
                rel="noreferrer noopener"
                className={"m-link"}
              >
                <b>here</b>
              </a>
              . I'd love any feedback or contributions. Feel free to fork/PR on
              the repo, or add an Issue with any bugs or new feature ideas. You
              can also see there what I'm planning on adding.
            </p>
            <br />
            <p>
              All advice offered here is to be taken at your own risk. Use
              common sense and general safety precautions at all times. Use
              special caution when crossing some of our crazy roads, most
              notably Kelly Drive and Girard. If you have any feature ideas,
              route ideas, questions, or just want to get in touch, don't
              hestiate to reach out over{" "}
              <a href="mailto:brandon@phillytrails.com" className={"m-link"}>
                {" "}
                email
              </a>
              ,{" "}
              <a
                href="https://linkedin.com/in/brandonfcohen"
                className={"m-link"}
                target="_ blank"
                rel="noreferrer noopener"
              >
                {" "}
                LinkedIn
              </a>
              ,{" "}
              <a
                href="https://github.com/brandonfcohen1"
                className={"m-link"}
                target="_ blank"
                rel="noreferrer noopener"
              >
                GitHub
              </a>
              ,{" "}
              <a
                href="https://www.strava.com/athletes/20927602"
                className={"m-link"}
                target="_ blank"
                rel="noreferrer noopener"
              >
                Strava
              </a>
              , or{" "}
              <a
                href="https://www.instagram.com/phillytrails/"
                className={"m-link"}
                target="_ blank"
                rel="noreferrer noopener"
              >
                Instagram
              </a>
              ,
            </p>
            <br />
            <p>
              <b>© 2021 PhillyTrails </b>
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
