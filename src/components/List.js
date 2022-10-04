import React from "react";

const List = ({ items, remove, toggle }) => {
    return (
        <ul className="list-group list-group-flush">
            {items.map((item) => (
                <li className="list-group-item" key={item.id}>
                    <span
                        onClick={() => toggle && toggle(item.id)}
                        className={
                            item.complete
                                ? "text-decoration-line-through text"
                                : "text"
                        }
                    >
                        {item.name}
                    </span>
                    <button
                        className="btn btn-primary"
                        onClick={() => remove(item.id)}
                    >
                        x
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default List;
