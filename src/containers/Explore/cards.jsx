import React, {useState} from 'react';
import {animated, interpolate, useSprings} from 'react-spring';
import {useGesture} from 'react-use-gesture';

import './styles.css';

import FeedItem from '../../components/Feed/FeedItem';

const urls = [
    null,
    null,
    'https://comp30002.blob.core.windows.net/image/photo-1601252360231-6925f0888ff4.jpeg',
    'https://comp30002.blob.core.windows.net/image/photo-1601173662818-95e6e19c4c50.jpeg',
    null,
    'https://comp30002.blob.core.windows.net/image/photo-1601202786213-8aeec3445a28.jpeg',
    'https://comp30002.blob.core.windows.net/image/photo-1601164768085-c3a5665db36f.jpeg',
    null,
    'https://comp30002.blob.core.windows.net/image/photo-1601249573867-f5937fea25e9.jpeg',
    'https://comp30002.blob.core.windows.net/image/photo-1586219136310-aef99aae7bac.jpeg',
    'https://comp30002.blob.core.windows.net/image/photo-1597763397091-6010cf10fdeb.jpeg',
    'https://comp30002.blob.core.windows.net/image/photo-1601253784060-807c709cfed7.jpeg',
];

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
});
const from = (i) => ({x: 0, rot: 0, scale: 1.5, y: -1000});
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
    `perspective(1500px) rotateX(0deg) rotateY(${
        r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;

function Deck(props) {
    const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
    const [springProps, set] = useSprings(urls.length, (i) => ({
        ...to(i),
        from: from(i),
    })); // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useGesture(
        ({
            args: [index],
            down,
            delta: [xDelta],
            distance,
            direction: [xDir],
            velocity,
        }) => {
            const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
            const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
            if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
            set((i) => {
                if (index !== i) return; // We're only interested in changing spring-data for the current spring
                const isGone = gone.has(index);
                const x = isGone
                    ? (200 + window.innerWidth) * dir
                    : down
                    ? xDelta
                    : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
                const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
                const scale = down ? props.zoom : 1; // Active cards lift up a bit
                return {
                    x,
                    rot,
                    scale,
                    delay: null,
                    config: {
                        friction: 80,
                        tension: down ? 800 : isGone ? 200 : 500,
                    },
                };
            });
            if (!down && gone.size === urls.length)
                setTimeout(() => gone.clear() || set((i) => to(i)), 600);
        }
    );
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return (
        <div class="body">
            <div class="root1">
                {springProps.map(({x, y, rot, scale}, i) => (
                    <animated.div
                        key={i}
                        style={{
                            transform: interpolate(
                                [x, y],
                                (x, y) => `translate3d(${x}px,${y}px,0)`
                            ),
                        }}
                    >
                        {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                        <animated.div
                            {...bind(i)}
                            style={{
                                transform: interpolate([rot, scale], trans),
                            }}
                        >
                            <FeedItem image={urls[i]} />
                        </animated.div>
                    </animated.div>
                ))}
            </div>
        </div>
    );
}

export default Deck;