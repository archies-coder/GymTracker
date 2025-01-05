import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import global from "@/assets/styles/global";
import { GluestackUIProvider } from "@/components/ui";
import Counter from "@/components/counter";
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionTitleText,
    AccordionIcon,
    AccordionContent,
    AccordionContentText,
} from "@/components/ui/accordion";
import { ChevronUpIcon, ChevronDownIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";

type ExerciseInput = {
    name: string;
    unit: keyof typeof KEY_BY_UNIT;
    count?: number; // Optional dynamic key for plates unit
    reps?: number; // Optional dynamic key for count unit
    size?: number;
};

type Exercise = {
    name: string;
    inputs: ExerciseInput[];
};

type MuscleGroup = {
    exercises: Exercise[];
};

type InputsByDay = Record<string, MuscleGroup>;

type Set = {
    [key: string]: number;
    reps: number;
};

type RecordedExercise = {
    name: string;
    sets: Set[];
};

const INPUTS_BY_DAY: InputsByDay = {
    chest: {
        exercises: [
            {
                name: "Incline SM Press",
                inputs: [
                    {
                        name: "Plates (10kg)",
                        unit: "plates",
                    },
                    {
                        name: "Reps",
                        unit: "count",
                    },
                ],
            },
            {
                name: "Cable Bench Flys",
                inputs: [
                    {
                        name: "Plates (5kg)",
                        unit: "plates",
                    },
                    {
                        name: "Reps",
                        unit: "count",
                    },
                ],
            },
        ],
    },
};

type KeyByUnit = {
    plates: string;
    count: string;
    weight: string;
};

type LabelPerDay = {
    [key: string]: string;
};

const KEY_BY_UNIT = {
    plates: "count",
    count: "reps",
    weight: "size",
} as const;

const LABEL_PER_DAY: LabelPerDay = {
    chest: "Chest",
};

export default function RecordWorkoutScreen({ day }: { day: string }) {
    const router = useRouter();
    const [state, setState] = useState(getInitialStatePerDay(day));

    const [recordedSets, setRecordedSets] = useState<RecordedExercise[]>(getInitialSets(day));

    function recordSet(exerciseName: string, set: { plates: number; reps: number }) {
        setRecordedSets((prev) => {
            return prev.map((exercise) => {
                if (exercise.name === exerciseName) {
                    return {
                        ...exercise,
                        sets: [...exercise.sets, set],
                    };
                }
                return exercise;
            });
        });
    }

    function handleStateChange(exerciseName: string, currentInput: ExerciseInput) {
        return function (newCount: number) {
            setState((prevState) => {
                return prevState.map((exercise) => {
                    if (exercise.name === exerciseName) {
                        return {
                            ...exercise,
                            inputs: exercise.inputs.map((input) => {
                                if (input.name === currentInput.name) {
                                    return {
                                        ...input,
                                        [KEY_BY_UNIT[input.unit]]: newCount,
                                    };
                                }

                                return input;
                            }),
                        };
                    }

                    return exercise;
                });
            });
        };
    }

    function finishTraining() {}

    return (
        <ScrollView contentContainerStyle={[global.container, styles.container]}>
            <View style={styles.header}>
                {/* Back Button */}
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>

                {/* Title */}
                {/* <Text style={styles.title}>Page Title</Text> */}
            </View>
            <Text style={global.greeting}>Record {LABEL_PER_DAY[day]} Workout</Text>
            {/* Inputs */}
            <Accordion type="multiple" style={styles.accordion}>
                {state.map(({ name, inputs }) => (
                    <AccordionItem value={name}>
                        <AccordionHeader>
                            <AccordionTrigger>
                                {({ isExpanded }) => {
                                    return (
                                        <>
                                            <AccordionTitleText>{name}</AccordionTitleText>
                                            {isExpanded ? (
                                                <AccordionIcon as={ChevronUpIcon} size="2xs" className="ml-3" />
                                            ) : (
                                                <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                                            )}
                                        </>
                                    );
                                }}
                            </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                            <View>
                                {inputs.map((currentInput) => (
                                    <View key={currentInput.name} style={styles.inputContainer}>
                                        <Text style={global.cardContent}>{currentInput.name}</Text>
                                        <Counter
                                            count={currentInput[KEY_BY_UNIT[currentInput.unit]] || 0}
                                            setCount={handleStateChange(name, currentInput)}
                                            min={0}
                                        />
                                    </View>
                                ))}
                                <View>
                                    <TouchableOpacity
                                        style={[global.button, styles.button]}
                                        onPress={() =>
                                            recordSet(name, {
                                                plates: 3,
                                                reps: 6,
                                            })
                                        }
                                    >
                                        <Text style={styles.buttonText}>Add Set</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            {/* Recorded Sets */}
            <View style={[global.card, styles.recordedSetsContainer]}>
                {recordedSets.map(({ name, sets }) => (
                    <>
                        <Text style={global.cardContent}>{name}</Text>
                        {sets.map(({ plates, reps }) => (
                            <Text style={global.cardContent}>
                                {plates} x {reps}
                            </Text>
                        ))}
                    </>
                ))}
            </View>
            {/* Finish Training  */}
            <View>
                <TouchableOpacity style={global.button} onPress={finishTraining}>
                    <Text style={global.buttonText}>End Training</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

function getInitialStatePerDay(day: string) {
    return INPUTS_BY_DAY[day].exercises.map((exercise) => ({
        ...exercise,
        inputs: exercise.inputs.map((input) => ({
            ...input,
            [KEY_BY_UNIT[input.unit]]: 0,
        })),
    }));
}

function getInitialSets(day: string) {
    return INPUTS_BY_DAY[day].exercises.map((exercise) => ({
        name: exercise.name,
        sets: [],
    }));
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        marginBottom: 20,
    },
    backButton: {
        marginRight: 16,
    },
    backText: {
        fontSize: 18,
        color: "#007BFF",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        width: "90%",
    },
    button: {
        padding: 5,
        width: "30%",
    },
    buttonText: {
        color: "#fff",
    },
    accordion: {
        width: "90%",
    },
    recordedSetsContainer: {
        marginTop: 15,
    },
});
