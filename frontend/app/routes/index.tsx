import type { MetaFunction } from "react-router";
import { useAccount } from "wagmi";
import { userIsOwner, userIsVoter, useWorkflowStatus, useGetProposal } from "~/lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export const meta: MetaFunction = () => {
    return [
        { title: "Voting DApp - Plateforme de Vote Décentralisée" },
        { name: "description", content: "Système de vote transparent et sécurisé sur la blockchain Ethereum" },
    ];
};

/**
 * Page d'accueil de la DApp de vote
 * Présente la plateforme avec l'état actuel du vote
 */
export default function Index() {
    const { address, isConnected } = useAccount();
    const isOwner = userIsOwner();
    const { isVoter } = userIsVoter();
    const { currentPhase, status, getColorClasses, isVotesTallied } = useWorkflowStatus();
    const { logs: proposals } = useGetProposal();

    const colorClasses = getColorClasses(currentPhase.color);

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8">
                <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Voting DApp
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Plateforme de vote décentralisée, transparente et sécurisée sur la blockchain Ethereum
                </p>
            </div>

            {/* État actuel du vote */}
            <Card className={`${colorClasses.bg} ${colorClasses.border} border-2`}>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-3">
                            <span className="text-4xl">{currentPhase.emoji}</span>
                            <span className={colorClasses.text}>État actuel du vote</span>
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClasses.text} bg-white/50`}>
                            Phase {status + 1}/6
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className={`text-2xl font-bold ${colorClasses.text} mb-2`}>
                            {currentPhase.name}
                        </h3>
                        <p className="text-lg text-gray-700">
                            {currentPhase.description}
                        </p>
                    </div>

                    {/* Statistiques */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        <div className="bg-white/70 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">
                                {proposals?.length || 0}
                            </div>
                            <div className="text-sm text-gray-600">
                                Proposition(s) enregistrée(s)
                            </div>
                        </div>
                        <div className="bg-white/70 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-purple-600">
                                {status + 1}
                            </div>
                            <div className="text-sm text-gray-600">
                                Phase actuelle sur 6
                            </div>
                        </div>
                        <div className="bg-white/70 rounded-lg p-4 text-center">
                            <div className="text-3xl">
                                {isVotesTallied ? '✅' : '⏳'}
                            </div>
                            <div className="text-sm text-gray-600">
                                {isVotesTallied ? 'Vote terminé' : 'Vote en cours'}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Call to Action basé sur le statut de connexion et le rôle */}
            {!isConnected ? (
                <Alert>
                    <AlertTitle className="flex items-center gap-2">
                        <span className="text-2xl">👋</span>
                        Bienvenue !
                    </AlertTitle>
                    <AlertDescription className="text-base">
                        Connectez votre wallet pour participer au vote ou consulter les résultats.
                        Utilisez le bouton "Connect Wallet" en haut à droite.
                    </AlertDescription>
                </Alert>
            ) : isOwner ? (
                <Alert className="bg-linear-to-r from-purple-50 to-blue-50 border-purple-200">
                    <AlertTitle className="flex items-center gap-2">
                        <span className="text-2xl">👑</span>
                        Espace Administrateur
                    </AlertTitle>
                    <AlertDescription className="space-y-3">
                        <p className="text-base">
                            Vous êtes connecté en tant qu'administrateur. Gérez le processus de vote.
                        </p>
                        <Link to="/admin">
                            <Button className="bg-purple-600 hover:bg-purple-700">
                                Accéder au Dashboard Admin
                            </Button>
                        </Link>
                    </AlertDescription>
                </Alert>
            ) : isVoter ? (
                <Alert className="bg-linear-to-r from-green-50 to-emerald-50 border-green-200">
                    <AlertTitle className="flex items-center gap-2">
                        <span className="text-2xl">✅</span>
                        Électeur enregistré
                    </AlertTitle>
                    <AlertDescription className="space-y-3">
                        <p className="text-base">
                            Vous êtes enregistré en tant qu'électeur. Participez au processus démocratique !
                        </p>
                        <Link to="/voter">
                            <Button className="bg-green-600 hover:bg-green-700">
                                Accéder à mon Espace Électeur
                            </Button>
                        </Link>
                    </AlertDescription>
                </Alert>
            ) : (
                <Alert variant="destructive">
                    <AlertTitle className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        Non enregistré
                    </AlertTitle>
                    <AlertDescription className="text-base">
                        Votre adresse ({address?.slice(0, 6)}...{address?.slice(-4)}) n'est pas enregistrée.
                        Contactez l'administrateur pour être ajouté à la liste blanche des électeurs.
                    </AlertDescription>
                </Alert>
            )}

            <Separator />

            {/* Section À propos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">🎯</span>
                            Processus de vote
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-2">
                            {[
                                { emoji: '�', title: '1. Enregistrement', desc: 'L\'admin ajoute les électeurs' },
                                { emoji: '💡', title: '2. Propositions', desc: 'Les électeurs soumettent leurs idées' },
                                { emoji: '🗳️', title: '3. Vote', desc: 'Chacun vote pour sa proposition préférée' },
                                { emoji: '🏆', title: '4. Résultats', desc: 'Décompte transparent des votes' }
                            ].map((step, index) => (
                                <div 
                                    key={index} 
                                    className={`flex items-start gap-3 p-3 rounded-lg ${
                                        status >= index ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                                    }`}
                                >
                                    <span className="text-2xl">{step.emoji}</span>
                                    <div>
                                        <div className="font-semibold">{step.title}</div>
                                        <div className="text-sm text-gray-600">{step.desc}</div>
                                    </div>
                                    {status >= index && (
                                        <span className="ml-auto text-green-600">✓</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">🔐</span>
                            Pourquoi la blockchain ?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            {[
                                { icon: '🛡️', title: 'Sécurité', desc: 'Votes immuables et infalsifiables' },
                                { icon: '👁️', title: 'Transparence', desc: 'Processus vérifiable par tous' },
                                { icon: '🔒', title: 'Confidentialité', desc: 'Identité des votants protégée' },
                                { icon: '⚡', title: 'Autonomie', desc: 'Pas d\'intermédiaire centralisé' }
                            ].map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <span className="text-2xl">{feature.icon}</span>
                                    <div>
                                        <div className="font-semibold">{feature.title}</div>
                                        <div className="text-sm text-gray-600">{feature.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Section Résultats */}
            {isVotesTallied && (
                <Card className="bg-linear-to-r from-yellow-50 to-amber-50 border-yellow-200 border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-3xl">🏆</span>
                            <span className="text-yellow-900">Résultats disponibles !</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-lg text-yellow-900">
                            Le vote est terminé et les résultats ont été comptabilisés.
                            Découvrez la proposition gagnante !
                        </p>
                        <Link to="/results">
                            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                                Voir les Résultats 🎉
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            )}

            {/* Footer info */}
            <Card className="bg-gray-50">
                <CardContent className="pt-6">
                    <div className="text-center text-sm text-gray-600">
                        <p>
                            🔗 Propulsé par Ethereum • Construit avec React Router & Wagmi
                        </p>
                        <p className="mt-2">
                            Projet Alyra - Formation Développeur Blockchain
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}