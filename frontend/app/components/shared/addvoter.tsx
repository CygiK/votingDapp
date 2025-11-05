import { useAddVoterToWhiteList, userIsVoter } from "~/lib/hooks";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field"
import { Card, CardContent } from "../ui/card";
import { isAddress } from "viem";
import * as React from "react";

export function AddVoter() {
        const { addVoterToWhiteList, isPending, isSuccess } = useAddVoterToWhiteList();
    const [address, setAddress] = React.useState("");

    const isValidAddress = isAddress(address);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {isSuccess && <p>Voter added successfully! {address}</p>}
            <Card>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <form>
                            <FieldGroup>
                                <FieldSet>
                                    <FieldLegend>Ajouter un nouvel électeur</FieldLegend>

                                    <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                           Address du voter
                                        </FieldLabel>
                                        <Input
                                        id="checkout-7j9-card-name-43j"
                                        placeholder="wallet address"
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        />
                                    </Field>
                                    </FieldGroup>
                                    <FieldDescription>
                                        Ajout d'un nouvelle adresse de voter à la whitelist
                                    </FieldDescription>
                                </FieldSet>
                                <Field orientation="horizontal">
                                    <Button 
                                        type="submit" disabled={!isValidAddress || !isPending}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addVoterToWhiteList(address as `0x${string}`);
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