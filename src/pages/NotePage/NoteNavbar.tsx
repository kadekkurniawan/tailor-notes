import React from "react";

import Select from "../../components/Select";
import Label from "../../components/Label";
import { Note } from "../../store/note";
import {
    MeasurementTypeStore,
    SewingInfoStore,
    useMeasurementTypeStore,
    useSewingInfoStore,
} from "../../store/clothing";
import Icon from "../../components/Icon";
import { InputWithBottomBorder } from "../../components/Input";

interface NoteNavbarProps {
    onClickBack: () => void;
    modifyNoteProperties: (note: Note, noteProperties: unknown) => void;
    note: Note;
    modifyClothingProperties: (clothingProperties: unknown) => void;
}

const NoteNavbar = React.forwardRef<any, NoteNavbarProps>(
    (
        { onClickBack, modifyClothingProperties, note, modifyNoteProperties },
        ref
    ) => {
        const measurementOptions = useMeasurementTypeStore(
            (state: MeasurementTypeStore) => state.measurementOptions
        );
        const sewingOptions = useSewingInfoStore(
            (state: SewingInfoStore) => state.sewingOptions
        );

        return (
            <nav ref={ref} className="navbar-container">
                <div className="flex flex-wrap justify-between gap-4 items-center">
                    <div className="flex items-center gap-3 w-2/3 max-w-xs">
                        <button onClick={onClickBack} className="button-icon">
                            <Icon type="arrow_back" />
                        </button>

                        <InputWithBottomBorder
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                modifyNoteProperties(note, {
                                    customerName: e.target.value,
                                })
                            }
                            value={note.customerName}
                            type="text"
                            placeholder="Customer name..."
                        />
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="extra-small-padding bg-slate-800 slate-700-border rounded">
                            <span className="semibold-text">
                                clothing type:{" "}
                                <span className="text-teal">
                                    {note.clothing.type}
                                </span>
                            </span>
                        </div>

                        <div className="extra-small-padding items-center flex gap-2 bg-slate-800 slate-700-border rounded">
                            <Label htmlFor="deadline" text="Deadline at:" />

                            <input
                                id="deadline"
                                value={note.deadline}
                                onChange={(e) =>
                                    modifyNoteProperties(note, {
                                        deadline: e.target.value,
                                    })
                                }
                                className="small-input"
                                type="date"
                            />
                        </div>

                        <div className="extra-small-padding flex items-center gap-2 bg-slate-800 slate-700-border rounded">
                            <Label
                                htmlFor="measurement-type"
                                text="Measurement Type"
                            />
                            <Select
                                className="bg-slate-900"
                                id="measurement-type"
                                value={note.clothing.measurementType!}
                                onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                ) =>
                                    modifyClothingProperties({
                                        measurementType: e.target.value,
                                    })
                                }
                            >
                                {measurementOptions}
                            </Select>
                        </div>

                        <div className="extra-small-padding flex items-center gap-2 bg-slate-800 slate-700-border rounded">
                            <Label htmlFor="sewing-info" text="Sewing info" />
                            <Select
                                className="bg-slate-900"
                                id="sewing-info"
                                value={note.clothing.sewingInfo!}
                                onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                ) =>
                                    modifyClothingProperties({
                                        sewingInfo: e.target.value,
                                    })
                                }
                            >
                                {sewingOptions}
                            </Select>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
);

export default NoteNavbar;
