import { BufferGeometry, ShaderMaterial, Vector2 } from 'three';
import { Water, WaterOptions } from 'three-stdlib';

interface Wave {
    steepness: number;
    wavelength: number;
    direction: Vector2;
}

export interface Water3DOptions extends WaterOptions {
    waves?: Wave[];
}

export class Water3D extends Water {
    constructor(geometry: BufferGeometry, options: Water3DOptions) {
        super(geometry, options);

        this.material.onBeforeCompile = shader => {
            this.material.defines.HAS_WAVES = (options.waves?.length ?? 0) > 0;
            this.material.defines.WAVE_COUNT = options.waves?.length;

            shader.uniforms.waves = {
                value: options.waves,
            };

            shader.vertexShader = /* glsl */`
                uniform mat4 textureMatrix;
                uniform float time;

                varying vec4 mirrorCoord;
                varying vec4 worldPosition;

                #include <common>
                #include <fog_pars_vertex>
                #include <shadowmap_pars_vertex>
                #include <logdepthbuf_pars_vertex>

                #ifdef HAS_WAVES
                struct Wave {
                    float steepness;
                    float wavelength;
                    vec2 direction;
                };

                uniform Wave waves[WAVE_COUNT];

                vec3 gerstnerWave (
                    Wave wave,
                    vec3 vertCoords,
                    inout vec3 binormal,
                    inout vec3 tangent
                ) {
                    float k = 2.0 * PI / wave.wavelength;
                    float c = sqrt(9.8 / k);
                    vec2 d = normalize(wave.direction);
                    float f = k * (dot(d, vertCoords.xz) - c * time);
                    float a = wave.steepness / k;

                    //vertCoords.x += d.x * (a * cos(f));
                    //vertCoords.y = a * sin(f);
                    //vertCoords.z += d.y * (a * cos(f));

                    tangent += vec3(
                        -d.x * d.x * (wave.steepness * sin(f)),
                        d.x * (wave.steepness * cos(f)),
                        -d.x * d.y * (wave.steepness * sin(f))
                    );

                    binormal += vec3(
                        -d.x * d.y * (wave.steepness * sin(f)),
                        d.y * (wave.steepness * cos(f)),
                        -d.y * d.y * (wave.steepness * sin(f))
                    );

                    return vec3(
                        d.x * (a * cos(f)),
                        a * sin(f),
                        d.y * (a * cos(f))
                    );
                }

                #endif

                void main() {
                    vec3 pos = vec3(position);
                    vec3 objectNormal = vec3( normal );

                    #ifdef USE_TANGENT
                    vec3 objectTangent = vec3( tangent.xyz );
                    #endif

                    #ifdef HAS_WAVES
                    vec3 wavesTangent = vec3(
                    #   ifdef USE_TANGENT
                        objectTangent
                    #   else
                        0.0, 0.0, 0.0
                    #   endif
                    );

                    vec3 wavesBinormal = vec3(0.0, 0.0, 0.0);

                    for (int i = 0; i < WAVE_COUNT; i++)
                        pos += gerstnerWave(waves[i], position, wavesTangent, wavesBinormal);

                    #ifdef USE_TANGENT
                    objectTangent = wavesTangent;
                    #endif

                    objectNormal = normalize(cross(wavesBinormal, wavesTangent));
                    #endif

                    mirrorCoord = modelMatrix * vec4( pos, 1.0 );
                    worldPosition = mirrorCoord.xyzw;
                    mirrorCoord = textureMatrix * mirrorCoord;

                    vec4 mvPosition =  modelViewMatrix * vec4( pos, 1.0 );
                    gl_Position = projectionMatrix * mvPosition;

                    vec3 transformedNormal = objectNormal;

                    #ifdef USE_INSTANCING
                    mat3 m = mat3( instanceMatrix );
                    transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
                    transformedNormal = m * transformedNormal;
                    #endif

                    transformedNormal = normalMatrix * transformedNormal;

                    #ifdef FLIP_SIDED
                    transformedNormal = - transformedNormal;
                    #endif

                    #ifdef USE_TANGENT
                    vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;

                    #   ifdef FLIP_SIDED
                    transformedTangent = - transformedTangent;
                    #   endif
                    #endif

                    #include <logdepthbuf_vertex>
                    #include <fog_vertex>
                    #include <shadowmap_vertex>
                }
            `;
        };

        this.material.customProgramCacheKey = () => (options.waves?.length ?? 0).toString();
    }
}
