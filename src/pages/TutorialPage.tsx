import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function TutorialPage() {
  return (
    <div className="tutorialContainer">
      <div className="rounded-xl text-center font-semibold text-xl bg-[#222831] text-yellow-200">
        TweakSync Tutorial
      </div>
      <ol className="orderedList inspector-scroll">
        <li>
          <span className="tutorialTitle"> Setting Up</span>

          <ul className="listDisc">
            <li>
              <span className="tutorialSubTitle">Setup VSCode:</span>
              <ul className="listSquare">
                <li>
                  {`-> Ensure that TweakSync is properly set up and running in your VS Code environment.`}
                </li>
              </ul>
            </li>
            <li>
              <span className="tutorialSubTitle">Host Locally:</span>
              <ul className="listSquare">
                <li>
                  {`-> Make sure the website you want to edit is hosted locally from VS Code.`}
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span className="tutorialTitle">Connecting to VSCode</span>
          <ul className="listDisc">
            <li>
              <span className="tutorialSubTitle">Connect Button:</span>
              <ul className="listSquare">
                <li>
                  {`-> On the homepage of the TweakSync Chrome extension, click the `}
                  <strong className="bg-connect rounded-md px-1">Connect</strong>
                  {` button to establish a connection with your VS Code setup.`}
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span className="tutorialTitle">Editing and Inspecting Elements</span>
          <ul className="listDisc">
            <li>
              <span className="tutorialSubTitle">Start Editing:</span>
              <ul className="listSquare">
                <li>
                  {`-> Click the `}
                  <strong className="bg-startEdit rounded-md px-1">Start Edit</strong>
                  {` button to enable editing mode.`}
                </li>
              </ul>
            </li>
            <li>
              <span className="tutorialSubTitle">Stop Editing:</span>
              <ul className="listSquare">
                <li>
                  {`-> When you want to stop editing, click the `}
                  <strong className="bg-stopEdit rounded-md px-1">Stop Edit</strong>
                  {` button.`}
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span className="tutorialTitle">Interacting with Webpage Elements</span>
          <ul className="listDisc">
            <li>
              <span className="tutorialSubTitle">Click to Select:</span>
              <ul className="listSquare">
                <li>{`-> After starting edit mode, click on elements on the webpage. The clicked element will be highlighted with a border to indicate selection.`}</li>
              </ul>
            </li>
            <li>
              <span className="tutorialSubTitle">Element Inspector:</span>
              <ul className="listSquare">
                <li>
                  {`-> Use the Element Inspector to view and modify the attributes of the selected element.`}
                </li>
              </ul>
            </li>
            <li>
              <span className="tutorialSubTitle">Style Inspector:</span>
              <ul className="listSquare">
                <li>{`-> Use the Element and Style Inspector to view and modify the attributes, properties and styles of the selected element.`}</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span className="tutorialTitle">Applying Changes</span>
          <ul className="listDisc">
            <li>
              <span className="tutorialSubTitle">Apply Button:</span>
              <ul className="listSquare">
                <li>
                  {`-> After making changes in the Element/Style Inspector, click the `}
                  <strong className="bg-apply px-1 rounded-md">Apply</strong>
                  {` button to send the updated styles back to VS Code.`}
                </li>
                <li>
                  <strong className="text-red-500">Note: </strong>
                  {`The `} <strong className="bg-apply px-1 rounded-md">Apply</strong>
                  {`button appears only for watched files in the Element Inspector. In the Style Inspector, it always appears.`}
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <div className="flex flex-col gap-1 justify-center items-center">
            <Link to={"/"}>
              <Button
                variant="outline"
                size="sm"
                data-tweaksyncui
                className="bg-[#222831] text-yellow-200 hover:bg-yellow-200 hover:text-[#222831]"
              >
                Go Back
              </Button>
            </Link>
          </div>
        </li>
      </ol>
    </div>
  );
}

export default TutorialPage;
