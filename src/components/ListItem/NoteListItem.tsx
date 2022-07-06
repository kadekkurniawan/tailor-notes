import React, { useState, useRef } from "react";
import { useClickAway } from "react-use";

import { Note } from "../../store/note";
import Icon from "../Icon";
import { AbsolutelyPositionOptionList } from "../Option";

interface NoteListItemProps {
    note: Note;
    onClickListItem: () => void;
    noteOptions: React.ReactNode;
}

const NoteListItem: React.FC<NoteListItemProps> = ({
    note,
    onClickListItem,
    noteOptions,
}) => {
    const [isNoteOptionsOpen, setIsNoteOptionsOpen] = useState<boolean>(false);

    const dateFormat: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    const handleToggleNoteOptionsVisibility = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setIsNoteOptionsOpen(!isNoteOptionsOpen);
    };

    const noteOptionsRef = useRef(null);

    useClickAway(noteOptionsRef, () => setIsNoteOptionsOpen(false));

    return (
        <li
            className="list-item-with-icon-at-right-side group-hover:bg-slate-400"
            onClick={onClickListItem}
        >
            <div className="">
                <h2>{note.customerName}</h2>
                <p className=" text-xs ">Clothing type: {note.clothing.type}</p>
                <p className="text-xs ">
                    Last modified:{" "}
                    {new Date(note.lastModified).toLocaleDateString(
                        undefined,
                        dateFormat
                    )}
                </p>
            </div>

            <div ref={noteOptionsRef}>
                <button
                    onClick={handleToggleNoteOptionsVisibility}
                    className={`${
                        !isNoteOptionsOpen && "py-1"
                    } center-children group-hover:text-slate-50 rounded-md hover:bg-slate-600`}
                >
                    <Icon type={isNoteOptionsOpen ? "clear" : "more_vert"} />
                </button>
                {isNoteOptionsOpen && (
                    <AbsolutelyPositionOptionList position="top-1/2 transform -translate-y-1/2 right-10">
                        {noteOptions}
                    </AbsolutelyPositionOptionList>
                )}
            </div>
        </li>
    );
};

export default NoteListItem;
