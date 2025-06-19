import { useState, useEffect } from 'react';
import PixelButton from './PixelButton';
import { motion } from 'framer-motion';

interface MemoryGameProps {
  className?: string;
}

type Card = {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
  icon: string;
};

const MemoryGame: React.FC<MemoryGameProps> = ({ className = '' }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  
  const icons = [
    '🎮', '🚀', '🌈', '🔥', '⚡', '🍕', '🎵', '🎨',
    '🌟', '🐱', '🐶', '🦄', '🍦', '🍔', '🚗', '🏆',
    '🎁', '🎭', '🎯', '🧩', '🧠', '👾', '🤖', '👻'
  ];
  
  const difficultySettings = {
    easy: { pairs: 6, gridSize: 'grid-cols-3 grid-rows-4' },
    medium: { pairs: 8, gridSize: 'grid-cols-4 grid-rows-4' },
    hard: { pairs: 12, gridSize: 'grid-cols-4 grid-rows-6' }
  };
  
  // Initialize game
  const initGame = () => {
    const pairs = difficultySettings[difficulty].pairs;
    const gameIcons = icons.slice(0, pairs);
    
    // Create pairs of cards
    let cardDeck: Card[] = [];
    gameIcons.forEach((icon, index) => {
      // Create two cards with the same value (a pair)
      cardDeck.push({
        id: index * 2,
        value: `card-${index}`,
        flipped: false,
        matched: false,
        icon
      });
      cardDeck.push({
        id: index * 2 + 1,
        value: `card-${index}`,
        flipped: false,
        matched: false,
        icon
      });
    });
    
    // Shuffle the cards
    cardDeck = shuffleCards(cardDeck);
    
    setCards(cardDeck);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameOver(false);
    setGameStarted(true);
  };
  
  // Shuffle cards using Fisher-Yates algorithm
  const shuffleCards = (deck: Card[]): Card[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore clicks if game is over or card is already flipped/matched
    if (gameOver || flippedCards.length >= 2) return;
    
    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return;
    
    // Flip the card
    const newCards = cards.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    );
    
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);
  };
  
  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);
      
      if (firstCard?.value === secondCard?.value) {
        // Match found
        const newCards = cards.map(card => 
          card.id === firstId || card.id === secondId
            ? { ...card, matched: true }
            : card
        );
        
        setCards(newCards);
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          const newCards = cards.map(card => 
            card.id === firstId || card.id === secondId
              ? { ...card, flipped: false }
              : card
          );
          
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);
  
  // Check for game over
  useEffect(() => {
    const totalPairs = difficultySettings[difficulty].pairs;
    if (gameStarted && matchedPairs === totalPairs) {
      setGameOver(true);
    }
  }, [matchedPairs, difficulty, gameStarted]);
  
  // Change difficulty
  const changeDifficulty = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    setGameStarted(false);
  };
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h3 className="font-pixel text-xl text-center mb-4 text-retro-white">
        <span className="text-pink-400">MEMORY</span> 
        <span className="text-cyan-300">MATCH</span> 
        <span className="text-yellow-300">GAME</span>
      </h3>
      
      {!gameStarted ? (
        <div className="mb-8 text-center">
          <p className="text-retro-lightgray mb-6">Match pairs of cards with the same icon. Test your memory skills!</p>
          
          <div className="mb-6">
            <h4 className="font-pixel text-sm text-retro-white mb-3">SELECT DIFFICULTY:</h4>
            <div className="flex gap-3 justify-center">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  className={`px-4 py-2 rounded font-pixel text-xs transition-all ${difficulty === level 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  onClick={() => changeDifficulty(level)}
                >
                  {level.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          <PixelButton onClick={initGame} variant="primary" size="lg">
            START GAME
          </PixelButton>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-gray-800 px-3 py-1 rounded font-pixel text-xs text-retro-lightgray">
              Moves: {moves}
            </div>
            <div className="bg-gray-800 px-3 py-1 rounded font-pixel text-xs text-retro-lightgray">
              Pairs: {matchedPairs}/{difficultySettings[difficulty].pairs}
            </div>
          </div>
          
          <div className={`grid ${difficultySettings[difficulty].gridSize} gap-2 mb-6`}>
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className={`aspect-square rounded cursor-pointer pixel-corners overflow-hidden
                  ${card.flipped || card.matched ? 'bg-indigo-800' : 'bg-gray-800'}
                  ${card.matched ? 'ring-2 ring-green-400' : ''}`}
                onClick={() => handleCardClick(card.id)}
                whileHover={{ scale: card.flipped || card.matched ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  rotateY: card.flipped || card.matched ? 180 : 0,
                  backgroundColor: card.matched ? 'rgba(16, 185, 129, 0.2)' : 'rgba(79, 70, 229, 0.2)'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full flex items-center justify-center relative">
                  {(card.flipped || card.matched) && (
                    <div className="absolute inset-0 flex items-center justify-center text-2xl transform rotate-y-180">
                      {card.icon}
                    </div>
                  )}
                  {!card.flipped && !card.matched && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2/3 h-2/3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-sm"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center gap-3">
            <PixelButton onClick={initGame} variant="secondary" size="sm">
              Restart
            </PixelButton>
            <PixelButton onClick={() => setGameStarted(false)} variant="accent" size="sm">
              Change Difficulty
            </PixelButton>
          </div>
          
          {gameOver && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg text-center"
            >
              <h4 className="font-pixel text-lg text-green-400 mb-2">GAME COMPLETE!</h4>
              <p className="text-retro-lightgray mb-4">You completed the game in {moves} moves!</p>
              <PixelButton onClick={initGame} variant="primary" size="sm">
                Play Again
              </PixelButton>
            </motion.div>
          )}
        </div>
      )}
      
      <p className="text-xs text-retro-lightgray mt-6 text-center max-w-md">
        Click cards to flip them and find matching pairs. Complete the game with as few moves as possible!
      </p>
    </div>
  );
};

export default MemoryGame;
