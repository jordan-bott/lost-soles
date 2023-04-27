import React from 'react';
import { useDispatch } from 'react-redux';
import { useCreateSockMutation } from '../store/socksApi';
import { useGetTokenQuery } from '../store/authApi';
import detailLogo from '../images/detailLogo.png';

function CreateSock() {
  const dispatch = useDispatch();
  const { data: user } = useGetTokenQuery();
  const accountId = user?.account?.id;


  const [ createSockMutation ] = useCreateSockMutation(accountId);

   const colors = [
    'Black',
    'Blue',
    'Brown',
    'Green',
    'Grey',
    'Orange',
    'Pink',
    'Purple',
    'Rainbow',
    'Red',
    'Multi',
    'White',
    'Yellow',
    'Other'
    ];

    const sizes = [
    'KS',
    'KM',
    'KL',
    'WS',
    'WM',
    'WL',
    'S',
    'M',
    'L',
    'AM(american med: XXL)'
    ];

    const patterns = [
    'Artistic',
    'Checkered',
    'Plaid',
    'Polka Dots',
    'Solid',
    'Stripped',
    'Zig Zag',
    'Other'
    ];

    const types = [
    'Ankle',
    'Anklet',
    'Crew',
    'No-Show',
    'Knee High',
    'Low Cut',
    'Thigh High',
    'Tube',
    'Toe Cover'
    ];

    const fabrics = [
    'Bamboo',
    'Cashmere',
    'Cotton',
    'Merino Wool',
    'Nylon',
    'Polyester',
    'Polypropylene',
    'Spandex',
    'Wool',
    'Other'
    ];

    const styles = [
    'Athletic',
    'Cute',
    'Fashion',
    'Novelty',
    'Sport',
    'Toe',
    'Vintage',
    'Other'
    ];

    const brands = [
    'Adidas',
    'Awesome Socks Club',
    'Bombas',
    'BOSS',
    'Calvin Klein',
    'Carhartt',
    'Darn Tough',
    'FALKE',
    'French Connection',
    'Fruit of the Loom',
    'GANT',
    'Hanes',
    'Happy Socks',
    'Nike',
    'Polo Ralph Lauren',
    'Puma',
    'Stance',
    'Tommy Hilfiger',
    'Other',
    'Unknown'
    ];


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newSock = {
            photo: formData.get('photo'),
            condition: 1,
            color: formData.get('color'),
            pattern: formData.get('pattern'),
            size: formData.get('size'),
            type: formData.get('type'),
            fabric: formData.get('fabric'),
            style: formData.get('style'),
            brand: formData.get('brand'),
            gift: formData.get('gift') === true,
        };
        try {
            await createSockMutation(newSock).unwrap();
            e.target.reset();
        } catch (err) {
            console.log("handleSubmit error", err);
        }
    };

    return (
        <div className="flex flex-col items-center mt-16">
            <div className="w-full max-w-screen-lg flex justify-between items-center px-8 mb-8">
                <img src={detailLogo} className="h-120" alt="Logo" />
            <div className="w-2/3 max-w-md mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-bold" htmlFor="color">
                        Color
                        </label>
                        <select
                        className="block w-full p-2 mb-6 border rounded bg-yellow appearance-none relative"
                        id="color"
                        name="color"
                        required
                        onChange={(e) =>
                            dispatch({ type: "UPDATE_COLOR", payload: e.target.value })
                        }
                        style={{
                            backgroundImage:
                            "url('https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png')",
                            backgroundPosition: "right 0.5rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5rem",
                            paddingRight: "1.5rem",
                        }}
                        defaultValue=""
                        >
                        <option value="" disabled>
                            Select a color
                        </option>
                        {colors.map((color) => (
                            <option
                            key={color}
                            value={color}
                            style={{ backgroundColor: "yellow", color: "white" }}
                            >
                            {color}
                            </option>
                        ))}
                        </select>

                        <label className="block mb-2 font-bold" htmlFor="pattern">
                        Pattern
                        </label>
                        <select
                        className="block w-full p-2 mb-6 border rounded bg-yellow appearance-none relative"
                        id="pattern"
                        name="pattern"
                        required
                        onChange={(e) =>
                            dispatch({ type: "UPDATE_PATTERN", payload: e.target.value })
                        }
                        style={{
                            backgroundImage:
                            "url('https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png')",
                            backgroundPosition: "right 0.5rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5rem",
                            paddingRight: "1.5rem",
                        }}
                        defaultValue=""
                        >
                        <option value="" disabled>
                            Select a pattern
                        </option>
                        {patterns.map((pattern) => (
                            <option
                            key={pattern}
                            value={pattern}
                            style={{ backgroundColor: "yellow", color: "white" }}
                            >
                            {pattern}
                            </option>
                        ))}
                        </select>
                                <label className="block mb-2 font-bold" htmlFor="type">
                        Type
                        </label>
                        <select
                        className="block w-full p-2 mb-6 border rounded bg-yellow appearance-none relative"
                        id="type"
                        name="type"
                        onChange={(e) =>
                            dispatch({ type: "UPDATE_TYPE", payload: e.target.value })
                        }
                        defaultValue=""
                        style={{
                            backgroundImage: "url('https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png')",
                            backgroundPosition: "right 0.5rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5rem",
                            paddingRight: "1.5rem",
                        }}
                        >
                        <option value="" disabled>
                            Select a type
                        </option>
                        {types.map((type) => (
                            <option key={type} value={type}>
                            {type}
                            </option>
                        ))}
                        </select>

                        <label className="block mb-2 font-bold" htmlFor="fabric">
                        Fabric
                        </label>
                        <select
                        className="block w-full p-2 mb-6 border rounded bg-yellow appearance-none relative"
                        id="fabric"
                        name="fabric"
                        required
                        onChange={(e) =>
                            dispatch({ type: "UPDATE_FABRIC", payload: e.target.value })
                        }
                        defaultValue=""
                        style={{
                            backgroundImage: "url('https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png')",
                            backgroundPosition: "right 0.5rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5rem",
                            paddingRight: "1.5rem",
                        }}
                        >
                        <option value="" disabled>
                            Select a fabric
                        </option>
                        {fabrics.map((fabric) => (
                            <option key={fabric} value={fabric}>
                            {fabric}
                            </option>
                        ))}
                        </select>
                        </div>

                        <div>
                        <label className="block mb-2 font-bold" htmlFor="size">
                        Size
                        </label>
                        <select
                        className="block w-full p-2 mb-6 border rounded bg-yellow appearance-none relative"
                        id="size"
                        name="size"
                        required
                        onChange={(e) =>
                            dispatch({ type: "UPDATE_SIZE", payload: e.target.value })
                        }
                        defaultValue=""
                        style={{
                            backgroundImage: "url('https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png')",
                            backgroundPosition: "right 0.5rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5rem",
                            paddingRight: "1.5rem",
                        }}
                        >
                        <option value="" disabled>
                            Select a size
                        </option>
                        {sizes.map((size) => (
                            <option key={size} value={size}>
                            {size}
                            </option>
                        ))}
                        </select>
                        <label className="block mb-2 font-bold" htmlFor="style">
                        Style
                        </label>
                        <select
                            className="block w-full p-2 mb-6 border rounded bg-yellow appearance-none relative"
                            type="text"
                            id="style"
                            name="style"
                            required
                            onChange={(e) =>
                                dispatch({ type: "UPDATE_STYLE", payload: e.target.value })
                            }
                            style={{
                                backgroundImage: "url('https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png')",
                                backgroundPosition: "right 0.5rem center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "1.5rem",
                                paddingRight: "1.5rem",
                            }}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a style
                            </option>
                            {styles.map((style) => (
                                <option key={style} value={style}>
                                {style}
                                </option>
                            ))}
                        </select>
                        <label className="block mb-2 font-bold" htmlFor="brand">
                            Brand
                        </label>
                        <select
                            className="block w-full p-2 mb-6 border rounded bg-yellow appearance-none relative"
                            type="text"
                            id="brand"
                            name="brand"
                            required
                            onChange={(e) =>
                                dispatch({ type: "UPDATE_BRAND", payload: e.target.value })
                            }
                            style={{
                                backgroundImage: "url('https://img.icons8.com/sf-regular/30/79aadd/circled-chevron-down.png')",
                                backgroundPosition: "right 0.5rem center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "1.5rem",
                                paddingRight: "1.5rem",
                            }}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a brand
                            </option>
                            {brands.map((brand) => (
                                <option key={brand} value={brand}>
                                {brand}
                                </option>
                            ))}
                        </select>
                        <label className="block mb-2 font-bold" htmlFor="photo">
                        Picture URL
                        </label>
                        <input
                        className="block w-full p-2 mb-6 border rounded bg-yellow text-blue"
                        type="text"
                        id="photo"
                        name="photo"
                        // required
                        placeholder="Enter a picture URL"
                        onChange={(e) =>
                            dispatch({
                            type: "UPDATE_PHOTO",
                            payload: e.target.value,
                            })
                        }
                        style={{ height: "2.6rem" }}
                        />
                        <div className="flex items-center mb-6">
                        <input
                            className="w-5 h-5 mr-2 rounded border-2 border-blue bg-red appearance-none checked:bg-green"
                            type="checkbox"
                            id="isGift"
                            name="isGift"
                            onChange={(e) => dispatch({ type: "UPDATE_IS_GIFT", payload: e.target.checked })}
                        />
                        <label className="text-md" htmlFor="isGift">Is this sock a gift?</label>
                        </div>
                    </div>
                    </div>
                    <button
                    type="submit"
                    className="bg-green font-bold py-2 px-4 rounded-lg w-[45%] h-[7%] border-2 mt-1 border-blue float-right"
                    style={{ lineHeight: "1" }}
                    >
                    Create
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default CreateSock;
