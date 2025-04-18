import React, { useEffect, useRef, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './WishButton.css';
import { Game } from '../../../types/Game';
import { privateApi } from '../../../api/privateApi';
import { useAuth } from '../../../context/AuthProvider';

interface WishButtonProps {
    game: Game;
}

export const WishButton: React.FC<WishButtonProps> = ({ game }) => {
    const auth = useAuth();
    const { user } = auth;
    const [isFavorite, setIsFavorite] = useState<boolean>(game.is_wished || false);
    const isFavoriteRef = useRef(game.is_wished || false);
    const lastSentValue = useRef(game.is_wished || false);
    const cooldownRef = useRef(false);
    const pendingChange = useRef<boolean | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIsFavorite(user?.game_collections?.find(collection => collection.game_id === game.id)?.is_wished ?? false);
    }, [user?.game_collections]);

    useEffect(() => {
        isFavoriteRef.current = isFavorite;
    }, [isFavorite]);

    const sendToAPI = async (value: boolean) => {
        isFavoriteRef.current = value;
        const response: { ok: boolean } = await privateApi(
            `/games/${game.id}`,
            "PATCH",
            { is_wished: isFavoriteRef.current }
        );
        if (!response.ok) {
            console.warn("❌ Erreur API, rollback état local");
            setIsFavorite(isFavoriteRef.current); // rollback UI
        } else {
            console.log("✅ Changement envoyé:", value);
            lastSentValue.current = value;
        }
    };

    const handleFavoriteToggle = async () => {
        const newState = !isFavorite;
        setIsFavorite(newState);
        isFavoriteRef.current = newState;
    
        if (!cooldownRef.current) {
            // 🔥 premier clic ou hors cooldown
            sendToAPI(newState);
            cooldownRef.current = true;
    
            timeoutRef.current = setTimeout(() => {
                cooldownRef.current = false;
                if (
                    pendingChange.current !== null &&
                    pendingChange.current !== lastSentValue.current
                ) {
                    sendToAPI(pendingChange.current);
                }
                pendingChange.current = null;
            }, 5000);
        } else {
            // ⏳ on est en cooldown, on stocke le dernier état
            pendingChange.current = newState;
            console.log("Cooldown actif, changement en attente");
        }
    };

    useEffect(() => {
        return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        const handleUnload = () => {
        if (
            pendingChange.current !== null &&
            pendingChange.current !== lastSentValue.current
        ) {
            navigator.sendBeacon(
            `/api/games/${game.id}`,
            JSON.stringify({ is_wished: pendingChange.current })
            );
        }
        };
        window.addEventListener("beforeunload", handleUnload);
        return () => window.removeEventListener("beforeunload", handleUnload);
    }, [game.id]);

    return (
        <div className='wish-button-container'>
            <button className='wish-button' onClick={handleFavoriteToggle}>
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </button>
        </div>
    );
};
