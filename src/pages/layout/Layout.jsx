import { Outlet } from "react-router-dom";
// import { useRef } from "react";
// import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./layout.css";

export default function Layout() {
    // const loaction = useLocation()

    // const nodeRef = useRef(null)
    return (
        <div>
            {/* <SwitchTransition>
                <CSSTransition key={loaction.pathname} nodeRef={nodeRef} classNames="fade" timeout={200}>
                    <div ref={nodeRef}>
                        <Outlet />
                    </div>
                </CSSTransition>
            </SwitchTransition> */}
            <Outlet />
        </div>
    )
}
