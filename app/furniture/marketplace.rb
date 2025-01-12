# @see features/furniture/marketplace.feature.md
class Marketplace
  include Placeable

  def self.append_routes(router)
    router.resources :marketplaces, only: [:show], module: "marketplace" do
      router.resources :products
      router.resources :carts do
        router.resources :cart_products
      end
    end
  end

  def self.from_placement(placement)
    placement.becomes(Marketplace)
  end
end
