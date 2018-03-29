import React from "react";
import posed, { PoseGroup } from "react-pose";
import { tween, spring, easing } from "popmotion";

import { routes } from "./routes";
import "./App1.css";

const sidebarProps = {
  open: { x: "0%" },
  closed: { x: "-100%" },
  initialPose: "closed"
};

const itemProps = {
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
};

console.log('=======', easing.easeInOut)
const Item = posed.div({
  enter: {
    x: "0%",
    opacity: 1,
    transition: ({ from, to }) =>
      tween({ from, to, ease: easing.easeInOut, duration: 300 })
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: ({ from, to }) =>
      tween({ from, to, ease: easing.easeInOut, duration: 300 })
  }
  // flip: {
  //   transition: tween
  // }
});

const ItemBottom = posed.div({
  enter: { y: "0%", opacity: 1 },
  exit: { y: "100%", opacity: 1, overflow: "hidden" }
  // flip: {
  //   transition: tween
  // }
});

// const Sidebar = posed.ul(sidebarProps);
// const Item = posed.li(itemProps);

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ["route1"],
      direction: "right"
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        items: ["route1", "route2"]
      });
    }, 1000);
  }
  remove = () => {
    this.setState({
      items: ["route1"]
    });
  };
  removeBottom = () => {
    this.setState(
      {
        direction: "bottom"
      },
      () => {
        this.setState({
          items: ["route1"]
        });
      }
    );
    setTimeout(() => {
      this.setState({
        direction: "right",
        items: ["route1", "route2"]
      });
    }, 1000);
  };
  onChange(e) {
    console.log("-----e", e);
  }
  render() {
    const { isOpen, direction } = this.state;
    const Component = direction === "bottom" ? ItemBottom : Item;
    return (
      <div className="sidebar">
        <PoseGroup>
          {this.state.items.map(item => (
            <Component
              onChange={{ x: x => console.log(x) }}
              className="item"
              style={{ backgroundColor: routes[item].bgColor }}
              data-key={item}
              key={item}
            >
              xxx {item}
              <div onClick={this.remove}>remove right</div>
              <div onClick={this.removeBottom}>remove bottom</div>
            </Component>
          ))}
        </PoseGroup>
      </div>
    );
  }
}
