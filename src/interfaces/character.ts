import { CHARACTER_STATUS, CHARACTER_GENDER } from "@/enums/character";

/**
 * Represents a character with various attributes.
 */
export interface ICharacter {
    /**
     * The unique identifier of the character.
     */
    id: number;

    /**
     * The name of the character.
     */
    name: string;

    /**
     * The status of the character.
     * Possible values are: 'Alive', 'Dead', 'unknown'.
     */
    status: CHARACTER_STATUS;

    /**
     * The species of the character.
     */
    species: string;

    /**
     * The type or subspecies of the character.
     */
    type: string;

    /**
     * The gender of the character.
     * Possible values are: 'Female', 'Male', 'Genderless', 'unknown'.
     */
    gender: CHARACTER_GENDER;

    /**
     * The origin location of the character.
     */
    origin: {
        /**
         * The name of the origin location.
         */
        name: string;

        /**
         * The link to the origin location endpoint.
         */
        url: string;
    };

    /**
     * The last known location of the character.
     */
    location: {
        /**
         * The name of the last known location.
         */
        name: string;

        /**
         * The link to the last known location endpoint.
         */
        url: string;
    };

    /**
     * The URL link to the character's image.
     * All images are 300x300px and intended to be used as avatars.
     */
    image: string;

    /**
     * List of URLs of episodes in which the character appeared.
     */
    episode: string[];

    /**
     * The URL link to the character's own endpoint.
     */
    url: string;

    /**
     * The time at which the character was created in the database.
     */
    created: string;
}
