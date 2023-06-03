import "./dropdown.scss";

export type DropdownItem = {
    name: string,
    value: string,
};

export type DropdownState = {
    index: number,
    isOpen: boolean,
}

type DropdownAProps = {
    title?: string,
    items: DropdownItem[],
    state: DropdownState,
    setState: React.Dispatch<React.SetStateAction<DropdownState>>,
}

export default function DropdownA(props: DropdownAProps): JSX.Element {

    const { title, items, state, setState } = props;
    //const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="dropdown-a-container form-el noselect" style={{height: title ? "55px" : "35px",}}>

            <label>{title}</label>
            
            <div className="space"/>

            <div className="dropdown-a">

                <div className="selected-item" onClick={() => setState(prev => ({ ...prev, isOpen: true }))}>
                    <span>{items[state.index].name}</span>
                </div>

                {state.isOpen && <div className="overlay" onClick={() => setState(prev => ({ ...prev, isOpen: false }))} />}

                <div className="dropdown" style={{ display: state.isOpen ? "flex" : "none" }}>
                    {
                        items.map((item, index) => {
                            return (
                                <button key={index} className="dropdown-item" onClick={(e) => {
                                    e.preventDefault();
                                    setState({ index: index, isOpen: false });
                                }} style={{ backgroundColor: state.index === index ? "rgb(245,245,245)" : "white" }}>
                                    {
                                        <>
                                            <div className="item-indicator" style={{ opacity: state.index === index ? "1" : "0" }} />
                                            <span>{item.name}</span>
                                        </>
                                    }
                                </button>
                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}