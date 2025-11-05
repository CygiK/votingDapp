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
            <h2>Add Proposal</h2>
            {data && <p>Proposal added successfully! {data}</p>}
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