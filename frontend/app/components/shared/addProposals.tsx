import { useAddProposal } from "~/lib/hooks/useAddProposal";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet, FieldLegend, FieldDescription } from "~/components/ui/field";
import { useState } from "react";

export function AddProposals(): React.ReactNode {
    const { addProposal, data } = useAddProposal();
    const [proposal, setProposal] = useState("");

    return (
        <div>
            {data && (
                <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-center gap-2">
                        <svg
                            className="h-5 w-5 text-green-600"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium text-green-800">
                            Proposition ajoutée avec succès !
                        </p>
                    </div>
                    <p className="mt-2 text-xs text-green-700">
                        Transaction hash: {data}
                    </p>
                </div>
            )}
            <Card>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <form>
                            <FieldGroup>
                                <FieldSet>
                                    <FieldLegend>Ajouter une nouvelle proposition</FieldLegend>

                                    <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                           Ajouter un proposition
                                        </FieldLabel>
                                        <Input
                                        id="checkout-7j9-card-name-43j"
                                        placeholder="proposal"
                                        onChange={(e) => setProposal(e.target.value)}
                                        required
                                        />
                                    </Field>
                                    </FieldGroup>
                                    <FieldDescription>
                                        Ajout d'un proposition
                                    </FieldDescription>
                                </FieldSet>
                                <Field orientation="horizontal">
                                    <Button 
                                        type="submit"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addProposal(proposal);
                                        }}
                                    >Add</Button>
                                </Field>
                            </FieldGroup>
                        </form>
                    </div>
                </CardContent>
                </Card>
        </div>
    );
}