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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { isAddress } from "viem";
import * as React from "react";

export function AddVoter() {
    const { addVoterToWhiteList, isSuccess, isLoading } = useAddVoterToWhiteList();
    const [address, setAddress] = React.useState("");
    const [lastAddedAddress, setLastAddedAddress] = React.useState("");

    const isValidAddress = isAddress(address);

    React.useEffect(() => {
        if (isSuccess) {
            setLastAddedAddress(address);
            setAddress("");
        }
    }, [isSuccess]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValidAddress) {
            addVoterToWhiteList(address as `0x${string}`);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Gestion des Électeurs</h2>
            
            {isSuccess && lastAddedAddress && (
                <Alert className="bg-green-50 border-green-200 animate-in fade-in slide-in-from-top-2">
                    <AlertTitle className="flex items-center gap-2 text-green-900">
                        <span className="text-2xl">✅</span>
                        Électeur ajouté avec succès !
                    </AlertTitle>
                    <AlertDescription className="mt-2 text-green-800">
                        <div className="space-y-2">
                            <p>L'adresse suivante a été ajoutée à la liste blanche :</p>
                            <code className="block bg-white px-3 py-2 rounded border border-green-300 text-sm font-mono break-all">
                                {lastAddedAddress}
                            </code>
                            <p className="text-sm">
                                Cet électeur peut maintenant soumettre des propositions et voter.
                            </p>
                        </div>
                    </AlertDescription>
                </Alert>
            )}
            
            <Card>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <form>
                            <FieldGroup>
                                <FieldSet>
                                    <FieldLegend>Ajouter un nouvel électeur</FieldLegend>

                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="voter-address-input">
                                                Adresse du voter
                                            </FieldLabel>
                                            <Input
                                                id="voter-address-input"
                                                placeholder="0x..."
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                required
                                                className={address && !isValidAddress ? 'border-red-500' : ''}
                                            />
                                            {address && !isValidAddress && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    ⚠️ Adresse Ethereum invalide
                                                </p>
                                            )}
                                        </Field>
                                    </FieldGroup>
                                    <FieldDescription>
                                        Ajoutez une nouvelle adresse à la liste blanche des électeurs.
                                        L'adresse doit être une adresse Ethereum valide (0x...).
                                    </FieldDescription>
                                </FieldSet>
                                <Field orientation="horizontal">
                                    <Button 
                                        type="submit" 
                                        disabled={!isValidAddress || isLoading}
                                        onClick={handleSubmit}
                                        className="min-w-[120px]"
                                    >
                                            <span className="flex items-center gap-2">
                                                ➕ Ajouter
                                            </span>
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </form>
                    </div>
                </CardContent>
                </Card>

        </div>
    );
}