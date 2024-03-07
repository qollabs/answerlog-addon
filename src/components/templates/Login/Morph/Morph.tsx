import { useSpring, animated } from 'react-spring';
import { useEffect, useState } from 'react';
import { Morphs } from './Morph.const';

export const MorphBackground = () => {
    const [morphIdx, setMorphIdx] = useState<number>(0);

    useEffect(() => {
        if (morphIdx === 0) {
            setTimeout(() => {
                setMorphIdx(morphIdx + 1);
            }, 100);
        }
    }, [morphIdx]);

    const animatedPropsList = Morphs.map((morph) =>
        useSpring({
            d: morph.d[morphIdx],
            fill: morph.fill,
            config: { duration: 800 },
        }),
    );

    return (
        <svg
            width="260"
            height="217"
            viewBox="0 0 260 217"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {animatedPropsList.map((animatedProps, index: number) => (
                <animated.path
                    key={index}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d={animatedProps.d}
                    fill={animatedProps.fill}
                />
            ))}
            <defs>
                <linearGradient
                    id="paint0_linear_298_584"
                    x1="352.879"
                    y1="31.604"
                    x2="-50.4407"
                    y2="211.719"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F9DABE" />
                    <stop offset="1" stopColor="#E9B7D4" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_298_584"
                    x1="0.542985"
                    y1="137.273"
                    x2="314.168"
                    y2="137.273"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FFB55C" />
                    <stop offset="0.3018" stopColor="#F8B680" />
                    <stop offset="1" stopColor="#E9B7D4" />
                </linearGradient>
                <linearGradient
                    id="paint2_linear_298_584"
                    x1="294.749"
                    y1="97.6899"
                    x2="85.061"
                    y2="230.719"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F9DABE" />
                    <stop offset="1" stopColor="#E9B7D4" />
                </linearGradient>
                <linearGradient
                    id="paint3_linear_298_584"
                    x1="296.252"
                    y1="80.9047"
                    x2="27.2204"
                    y2="208.356"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F9DABE" />
                    <stop offset="1" stopColor="#E9B7D4" />
                </linearGradient>
                <linearGradient
                    id="paint4_linear_298_584"
                    x1="393.398"
                    y1="100.647"
                    x2="193.123"
                    y2="382.287"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F9DABE" />
                    <stop offset="1" stopColor="#E9B7D4" />
                </linearGradient>
                <linearGradient
                    id="paint5_linear_298_584"
                    x1="283.788"
                    y1="56.716"
                    x2="10.6973"
                    y2="121.97"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F9DABE" />
                    <stop offset="1" stopColor="#E9B7D4" />
                </linearGradient>
                <linearGradient
                    id="paint6_linear_298_584"
                    x1="306.822"
                    y1="78.5328"
                    x2="30.3813"
                    y2="213.561"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F9DABE" />
                    <stop offset="1" stopColor="#E9B7D4" />
                </linearGradient>
                <linearGradient
                    id="paint7_linear_298_584"
                    x1="312.563"
                    y1="27.3074"
                    x2="-30.9357"
                    y2="96.3616"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F9DABE" />
                    <stop offset="1" stopColor="#E9B7D4" />
                </linearGradient>
                <linearGradient
                    id="paint8_linear_298_584"
                    x1="282.701"
                    y1="49.7781"
                    x2="10.3273"
                    y2="114.511"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F9DABE" />
                    <stop offset="1" stopColor="#E9B7D4" />
                </linearGradient>
                <linearGradient
                    id="paint9_linear_298_584"
                    x1="109.662"
                    y1="12.8384"
                    x2="105.521"
                    y2="14.3113"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F9DABE" />
                    <stop offset="1" stopColor="#E9B7D4" />
                </linearGradient>
            </defs>
        </svg>
    );
};
